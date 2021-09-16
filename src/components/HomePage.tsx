import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, RouteComponentProps } from "react-router-dom";
import NavigationBar from './NavigationBar'

interface MatchProps {
  slug: string
}

interface ConceptInterface {
  title: string;
  question: string;
  answer: string;
  concepts: ConceptInterface[],
  slug: string;
}

function HomePage () {
  const [query, setQuery] = useState('')
  const [concepts, setConcepts] = useState<ConceptInterface[] | undefined>(undefined)

  function updateQuery (e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value)
  }

  async function onKeyDown (e: React.KeyboardEvent<HTMLInputElement>) {
    const { key } = e

    if (key === 'Enter' && query && query !== '') {
      const response = await fetch(`http://localhost:3333/concepts?q=${query}`)
      const json = await response.json()
      setConcepts(json)
    } else if (query === '') {
      setConcepts([])
    }
  }

  return (
    <div className="search-area">
      <div className="search-box">
        <div>
          <label htmlFor="search-input">Search Knowledge Base</label>
        </div>

        <div>
          <input
            id="search-input"
            type="text"
            autoComplete="off"
            value={query}
            onChange={updateQuery}
            onKeyDown={onKeyDown}
          />
        </div>
      </div>

      <div className="search-results">
        {concepts?.map(concept => {
          return (
            <div key={concept.slug}>
              <Link to={`/learn/${concept.slug}`}>{concept.title}</Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HomePage
