import { useRoute } from 'vue-router'
import router from '@/router'
import { computed } from 'vue'
import type { SortBy, SortDirection } from '@/lib/types'

export function useSort() {
  const route = useRoute()

  const sortBy = computed(() => (route.query.sortBy as SortBy) || null)
  const sortDirection = computed(() => (route.query.sortDirection as SortDirection) || null)

  const updateSortQuery = (key: string, currentSortBy: string, currentSortDirection: string) => {
    let newSortBy: string | undefined = key
    let newSortDirection: string | undefined = 'az'

    if (currentSortBy === key) {
      if (currentSortDirection === 'az') {
        newSortDirection = 'za'
      } else if (currentSortDirection === 'za') {
        newSortBy = undefined
        newSortDirection = undefined
      }
    }

    router.push({
      query: {
        ...route.query,
        sortBy: newSortBy,
        sortDirection: newSortDirection
      }
    })
  }

  const cycleSort = (key: string) => {
    updateSortQuery(key, sortBy.value, sortDirection.value)
  }

  return {
    sortBy,
    sortDirection,
    cycleSort
  }
}
