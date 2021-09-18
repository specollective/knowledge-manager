export interface ChunkInterface {
  id?: number;
  conceptId?: number;
  interval: number;
  repetition: number;
  efactor: number;
  dueDate: string;
  reviewId?: number;
}
