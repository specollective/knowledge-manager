import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  RouteComponentProps,
  useParams,
  useHistory,
  useLocation
} from "react-router-dom";

import { api } from '../services/api'

import { ConceptInterface } from '../interfaces/ConceptInterface'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function checkIfImageExists (url: string, callback: (value: boolean) => boolean) {
  const img = new Image();
  img.src = url;

  if (img.complete) {
    callback(true);
  } else {
    img.onload = () => {
      callback(true);
    };
    img.onerror = () => {
      callback(false);
    };
  }
}

function InputForType ({ name, value, type, handleUpdate } : {
  name: string,
  type: string,
  handleUpdate: (e: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLTextAreaElement>) => void,
  value: string,
}) {
  const [imageVisible, setImageVisible] = useState(false)

  useEffect(() => {
    if (type === 'image') {
      checkIfImageExists(value, setImageVisible)
    }
  }, [type, value])

  if (type === 'image') {
    return (
      <div>
        <input name={name} value={value} onChange={handleUpdate} />
        <br/>
        { imageVisible && <img alt={name} src={value} /> }
      </div>
    )
  } else {
    return (
      <textarea
        autoComplete="off"
        name={name}
        value={value}
        onChange={handleUpdate}
      >
      </textarea>
    )
  }
}

function ConceptCreatePage () {
  const history = useHistory();
  const query = useQuery();
  const conceptId: any = query.get('conceptId')

  const [concept, setConcept] = useState<ConceptInterface>({
    title: '',
    question: '',
    answer: '',
    slug: '',
    conceptId: conceptId ? parseInt(conceptId) : undefined
  })

  function validateConcept () {
    const attributes = ['title', 'slug', 'question', 'answer']
    const missingAttribute = attributes.some(attribute => {
      return concept[attribute as keyof ConceptInterface] === ''
    })

    if (missingAttribute) {
      window.alert('Missing details!')
      return false
    }

    return true
  }

  async function saveConcept (e: React.FormEvent) {
    e.preventDefault()

    if (!validateConcept()) return

    try {
      await api('POST', 'concepts', undefined, { ...concept })
      history.goBack()
    } catch {
      window.alert('Something went wrong!')
    }
  }

  function handleUpdate (e: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLTextAreaElement>) {
    if (e.target.name === 'title') {
      concept.slug = e.target.value.split(' ').join('-').toLowerCase()
    }

    setConcept({ ...concept, [e.target.name] : e.target.value })
  }

  return (
    <div>
      <div className="search-area">
        <h1>Create Concept</h1>

        <form onSubmit={saveConcept}>
          <div>
            <label>Title</label>
            <input
              name="title"
              type="text"
              autoComplete="off"
              value={concept.title}
              onChange={handleUpdate}
            />
          </div>

          <div>
            <select name="questionType" value={concept.questionType} onChange={handleUpdate}>
              <option value="text">Text</option>
              <option value="image">Image</option>
            </select>
            <label>Question</label>

            <InputForType
              name="question"
              type={concept.questionType}
              value={concept.question}
              handleUpdate={handleUpdate}
            />
          </div>

          <div>
            <label>Answer</label>
            <textarea
              name="answer"
              autoComplete="off"
              value={concept.answer}
              onChange={handleUpdate}
            ></textarea>
          </div>

          <div>
            <label>Slug</label>
            <input
              name="slug"
              type="text"
              autoComplete="off"
              value={concept.slug}
              onChange={handleUpdate}
            />
          </div>

          <div>
            <label>Parent Concept</label>
            <input
              name="conceptId"
              type="text"
              autoComplete="off"
              value={concept.conceptId}
              onChange={handleUpdate}
            />
          </div>

          <plain-button type="submit">Save Concept</plain-button>
        </form>
      </div>
    </div>
  )
}

export default ConceptCreatePage
