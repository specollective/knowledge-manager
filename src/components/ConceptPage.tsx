import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, RouteComponentProps } from "react-router-dom";
import NavigationBar from './NavigationBar'

interface MatchProps {
  slug: string
}

interface ConceptInterface {
  id: number;
  question: string;
  answer: string;
  slug: string;
  concepts: ConceptInterface[]
}

const ConceptPage = ({ match }: RouteComponentProps<MatchProps>) => {
  const { slug } = match.params
  const [loading, setLoading] = useState(true)
  const [concept, setConcept] = useState<ConceptInterface | undefined>(undefined)

  useEffect(() => {
    async function loadData () {
      const response = await fetch(`http://localhost:3333/concepts?slug=${slug}&_embed=concepts`)
      const json = await response.json()
      const record = json[0]
      setConcept(record)
      setLoading(false)
    }
    loadData()
  }, [slug])

  if (loading) return <div>Loading...</div>
  if (!concept) return <div>Not Found</div>

  return (
    <div>
      <div className="concept-header">
        <div>
          <h3>{concept.question}</h3>
          <h4>{concept.answer.split('\n').map(line => <p key={line}>{line}</p>)}</h4>
        </div>
        <div>
          { concept?.concepts?.length > 0 && <Link to={`/review/${concept.slug}`}>Review Concept</Link> }
          <Link to={`/new?conceptId=${concept.id}`}>New Concept</Link>
        </div>
      </div>

      <div className="concept-subconcepts">
        <div>
          <h3>Subconcepts</h3>
        </div>
        <div>
          {concept.concepts.map(subconcept => {
            return (
              <div key={subconcept.slug}>
                <Link to={`/learn/${subconcept.slug}`}>{subconcept.question}</Link>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ConceptPage
