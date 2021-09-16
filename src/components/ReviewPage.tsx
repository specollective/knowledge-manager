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
  title: string;
  concepts: ConceptInterface[]
}

interface ChunkInterface {
  id: number;
  performance: number;
}

function ReviewCompleteMessage ({ concept } : {
  concept: ConceptInterface
}) {
  return (
    <div>
      <div className="review-complete">
        <h1>{concept.title} Complete!</h1>
        <Link to={`/learn/${concept.slug}`}>Back to Concept</Link>
      </div>
    </div>
  )
}

function ReviewButtonGroup ({ updateChunk } : {
  updateChunk: (value: number) => void
}) {
  return (
    <div className="review-button-group">
      <button onClick={() => updateChunk(0)}>Bad</button>
      <button onClick={() => updateChunk(1)}>Good</button>
      <button onClick={() => updateChunk(2)}>Perfect</button>
    </div>
  )
}

const KNOWLEDGE_BASE_URL = 'http://localhost:3333'
const PERFORMANCE_URL = 'http://localhost:4444'

const ReviewPage = ({ match }: RouteComponentProps<MatchProps>) => {
  const { slug } = match.params
  const [loading, setLoading] = useState(true)
  const [concept, setConcept] = useState<ConceptInterface | undefined>(undefined)
  const [chunk, setChunk] = useState<ChunkInterface | undefined>(undefined)
  const [subconcepts, setSubconcepts] = useState<ConceptInterface[]>([])
  const [answerVisible, setAnswerVisible] = useState(false)

  async function loadData () {
    let response

    response = await fetch(`${KNOWLEDGE_BASE_URL}/concepts?slug=${slug}&_embed=concepts`)
    const conceptJSON = await response.json()
    const conceptObject = conceptJSON[0]
    setConcept(conceptObject)
    setSubconcepts(conceptObject.concepts)

    response = await fetch(`${PERFORMANCE_URL}/chunks?conceptId=${conceptObject.id}`)
    const chunksJSON = await response.json()
    const chunkObject = chunksJSON[0]
    setChunk(chunkObject)


    setLoading(false)
  }

  useEffect(() => { loadData() }, [slug])

  function showAnswer () {
    setAnswerVisible(true)
  }

  function updateChunk (value: number) {
    const subconcept = subconcepts?.shift()

    let chunkJSON
    if (chunk) {
      chunkJSON = chunk
      chunkJSON.performance = value
    } else {
      chunkJSON = {
        performance: value,
        conceptId: subconcept?.id
      }
    }

    const id = chunk ? `/${chunk.id}` : ''

    fetch(`${PERFORMANCE_URL}/chunks${id}`, {
      method: chunk ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(chunkJSON),
    })
      .then(response => response.json())
      .then(async data => {
        setChunk(data)
        setAnswerVisible(false)
        setSubconcepts([...subconcepts])

        const subconcept = subconcepts[0]
        const response = await fetch(`${PERFORMANCE_URL}/chunks?conceptId=${subconcept.id}`)
        const chunksJSON = await response.json()
        const chunkObject = chunksJSON[0]
        setChunk(chunkObject)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const visibility = answerVisible ? 'visible' : 'hidden'
  const subconcept = subconcepts[0]

  if (loading || !concept) return <div>Loading...</div>
  if (!subconcept && concept) return <ReviewCompleteMessage concept={concept} />

  return (
    <div>
      <div className="review-subconcept">
        <div>
          <div className="concept-question">
            <h2>{subconcept.question}</h2>
          </div>
          <div className="concept-answer" style={{ visibility: visibility }}>
            <h3>
              {subconcept.answer}
            </h3>
          </div>
        </div>

        <div className="review-button-group">
          { answerVisible
              ? <ReviewButtonGroup updateChunk={updateChunk} />
              : <button onClick={showAnswer}>Show Answer</button>
          }
        </div>
      </div>
    </div>
  )
}

export default ReviewPage
