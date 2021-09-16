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

interface MatchProps {
  slug: string
}

interface ConceptInterface {
  title: string;
  question: string;
  answer: string;
  concepts?: ConceptInterface[],
  conceptId?: number,
  slug: string;
}

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ConceptCreatePage () {
  const history = useHistory();
  const query = useQuery();
  const conceptId = query.get('conceptId')
  const [concept, setConcept] = useState<ConceptInterface>({
    title: '',
    question: '',
    answer: '',
    slug: '',
    conceptId: conceptId ? Number(conceptId) : undefined,
  })

  async function saveConcept (e: React.FormEvent) {
    e.preventDefault()

    if (concept.title === '') return
    if (concept.slug === '') return
    if (concept.question === '') return
    if (concept.answer === '') return

    try {
      await api('POST', 'concepts', { ...concept })
      history.goBack()
    } catch {
      window.alert('Something went wrong!')
    }
  }

  function handleUpdate (e: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLTextAreaElement>) {
    if (e.target.name === 'title') {
      concept.slug = e.target.value.split(' ').join('-')
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

export default ConceptCreatePage
