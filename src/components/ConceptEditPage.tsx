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

interface MatchProps {
  slug: string
}

function ConceptEditPage () {
  const history = useHistory()
  const { slug } = useParams<MatchProps>()
  const [concept, setConcept] = useState<ConceptInterface | undefined>(undefined)

  async function loadConcept () {
    const json = await api('GET', 'concepts?slug=', slug)
    console.log(json)
    setConcept(json[0])
  }

  useEffect(() => {
    loadConcept()
  }, [])

  function validateConcept () {
    if (!concept) return

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
      await api('PUT', 'concepts/', concept.id, { ...concept })
      history.goBack()
    } catch {
      window.alert('Something went wrong!')
    }
  }

  function handleUpdate (e: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLTextAreaElement>) {
    if (!concept) return

    if (e.target.name === 'title') {
      concept.slug = e.target.value.split(' ').join('-')
    }

    setConcept({ ...concept, [e.target.name] : e.target.value })
  }

  if (!concept) return <div>Loading...</div>


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
            <label>Question</label>
            <textarea
              name="question"
              autoComplete="off"
              value={concept.question}
              onChange={handleUpdate}
            ></textarea>
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

          <button type="submit">Save Concept</button>
        </form>
      </div>
    </div>
  )
}

export default ConceptEditPage
