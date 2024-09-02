export type Book = {
  id: string
  title: string
  seller: string
  integration: 'reels' | 'stories'
}

export type SortBy = 'title' | 'seller'
export type SortDirection = 'az' | 'za'
