import { computed } from 'vue'
import type { Book, SortBy, SortDirection } from '@/lib/types'
import { useRoute } from 'vue-router'

export function useBooks() {
  const route = useRoute()

  const allBooks: Book[] = JSON.parse(localStorage.getItem('books') || 'null') || []
  const booksPerPage = 20

  const currentPage = computed(() => Number(route.query.page) || 1)
  const sortBy = computed(() => (route.query.sortBy as SortBy) || null)
  const sortDirection = computed(() => (route.query.sortDirection as SortDirection) || null)

  const filteredBooks = computed(() => {
    const books =
      route.query.integration !== 'all' && route.query.integration
        ? allBooks.filter((book) => book.integration === route.query.integration)
        : allBooks

    if (route.query.query) {
      const query = route.query.query as string
      const lowerCaseQuery = query.toLowerCase()

      const filteredByTitle = books.filter((book) =>
        book.title.toLowerCase().includes(lowerCaseQuery)
      )

      const filteredBySeller = books.filter((book) =>
        book.seller.toLowerCase().includes(lowerCaseQuery)
      )

      return [...new Set([...filteredByTitle, ...filteredBySeller])]
    }

    return books
  })

  const totalBooks = computed(() => filteredBooks.value.length)

  const sortedBooks = computed(() => {
    const sorted = [...filteredBooks.value]
    if (sortBy.value) {
      sorted.sort((a, b) => {
        if (a[sortBy.value!] < b[sortBy.value!]) {
          return sortDirection.value === 'az' ? -1 : 1
        }
        if (a[sortBy.value!] > b[sortBy.value!]) {
          return sortDirection.value === 'az' ? 1 : -1
        }
        return 0
      })
    }
    return sorted
  })

  const slicedBooks = computed(() => {
    const start = (currentPage.value - 1) * booksPerPage
    const end = start + booksPerPage
    return sortedBooks.value.slice(start, end)
  })

  return {
    currentPage,
    totalBooks,
    slicedBooks
  }
}
