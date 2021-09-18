import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Link, RouteComponentProps, useLocation } from "react-router-dom"
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import dayjs from 'dayjs'

import NavigationBar from './NavigationBar'
import { ConceptInterface } from '../interfaces/ConceptInterface'
import { ChunkInterface } from '../interfaces/ChunkInterface'
import { practice } from '../services/practice'
import { api } from '../services/api'
import { PERFORMANCE_OPTIONS } from '../constants/performance-options'

dayjs.extend(isSameOrBefore)

interface MatchProps {
  slug: string
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
    <div className="review-button-group" onChange={(e) => updateChunk(e.target.value)}>
      {
        PERFORMANCE_OPTIONS.map(option => {
          return (
            <div>
              <input key={option.name} type="radio" value={option.value} name={option.name} /> {option.label}
            </div>
          )
        })
      }
    </div>
  )
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ReviewPage = ({ match }: RouteComponentProps<MatchProps>) => {
  const { slug } = match.params
  const query = useQuery()
  const [loading, setLoading] = useState(true)
  const [concept, setConcept] = useState<ConceptInterface | undefined>(undefined)
  const [chunk, setChunk] = useState<ChunkInterface | undefined>(undefined)
  const [subconcepts, setSubconcepts] = useState<ConceptInterface[]>([])
  const [answerVisible, setAnswerVisible] = useState(false)

  async function loadData () {
    let response

    const conceptsJSON = await api(
      'GET',
      'concepts',
      `?slug=${slug}&_embed=concepts`,
      null,
      'knowledge-api',
    )
    const conceptObject = conceptsJSON[0]

    const chunksJSON = await api(
      'GET',
      'chunks',
      `?reviewId=${conceptObject.id}`,
      null,
      'performance-api',
    )

    const chunkIndex = chunksJSON.reduce((accumulator, chunkRecord) => {
      accumulator[chunkRecord.conceptId] = chunkRecord
      return accumulator
    }, {})

    let filtersSubconcepts = conceptObject.concepts

    if (query.get('due')) {
      filtersSubconcepts = filtersSubconcepts.filter(subconcept => {
        const chunkRecord = chunkIndex[subconcept.id]
        if (!chunkRecord) {
          return true
        } else {
          return dayjs(chunkRecord.dueDate).isSameOrBefore(dayjs(Date.now()))
        }
      })
    }

    setConcept(conceptObject)
    setSubconcepts(filtersSubconcepts)

    const currentSubconcept = filtersSubconcepts[0]

    if (!currentSubconcept) return

    const chunkObject = chunkIndex[currentSubconcept.id]

    if (chunkObject) {
      setChunk(chunkObject)
    } else {
      setChunk({
        conceptId: currentSubconcept.id,
        reviewId: conceptObject.id,
        interval: 0,
        repetition: 0,
        efactor: 2.5,
        dueDate: dayjs(Date.now()).format('YYYY-MM-DD')
      })
    }

    setLoading(false)
  }

  useEffect(() => { loadData() }, [slug])

  function showAnswer () {
    setAnswerVisible(true)
  }

  async function updateChunk (value: number) {
    // Remove the concept being reviewed
    subconcepts?.shift()

    const updatedChunk = practice(chunk, value)
    const id = chunk.id ? `/${chunk.id}` : ''
    const method = chunk.id ? 'PUT' : 'POST'
    const updateChunkJSON = await api(
      method,
      'chunks',
      id,
      {
        ...updatedChunk,
        dueDate: dayjs(updatedChunk.dueDate).format('YYYY-MM-DD'),
      },
      'performance-api',
    )

    setChunk(updateChunkJSON)
    setAnswerVisible(false)
    setSubconcepts([...subconcepts])

    const nextConceptId = subconcepts[0]?.id

    if (!nextConceptId) return

    const nextChunkJSON = await api(
      'GET',
      'chunks',
      `?conceptId=${nextConceptId}`,
      null,
      'performance-api',
    )
    const nextChunk = nextChunkJSON[0]

    if (nextChunk) {
      setChunk(nextChunk)
    } else {
      setChunk({
        conceptId: nextConceptId,
        interval: 0,
        repetition: 0,
        efactor: 2.5,
        dueDate: dayjs(Date.now()).format('YYYY-MM-DD')
      })
    }
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

        <div className="review-actions">
          <div>
            { answerVisible
                ? <ReviewButtonGroup updateChunk={updateChunk} />
                : <button onClick={showAnswer}>Show Answer</button>
            }
          </div>

          <div>
            <h4>
              Due date {dayjs(chunk.dueDate).format('MM/DD/YYYY')}
            </h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewPage
