import dayjs from 'dayjs'
import { supermemo, SuperMemoItem, SuperMemoGrade } from 'supermemo'

import { ChunkInterface } from '../interfaces/ChunkInterface'

export function practice (chunk: ChunkInterface, grade: SuperMemoGrade) : ChunkInterface {
  const { interval, repetition, efactor } = supermemo(chunk, grade)

  const dueDate = dayjs(Date.now()).add(interval, 'day').format('YYYY-MM-DD')

  return { ...chunk, interval, repetition, efactor, dueDate }
}
