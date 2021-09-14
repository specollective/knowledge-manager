import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, RouteComponentProps } from "react-router-dom";
import NavigationBar from './NavigationBar'

interface MatchProps {
  slug: string
}

interface ConceptInterface {
  question: string;
  answer: string;
}

const ConceptPage = ({ match }: RouteComponentProps<MatchProps>) => {
  const { slug } = match.params
  const [loading, setLoading] = useState(true)
  const [concept, setConcept] = useState<ConceptInterface | undefined>(undefined)

  useEffect(() => {
    async function loadData () {
      const response = await fetch(`http://localhost:3333/concepts?slug=${slug}`)
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
      <p>{concept.question}</p>
      <p>{concept.answer}</p>
    </div>
  )
}

export default ConceptPage
