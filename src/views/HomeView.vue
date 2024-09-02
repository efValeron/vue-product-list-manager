<script setup lang="ts">
import BooksList from '@/components/books-list.vue'
import SearchFilters from '@/components/search-filters.vue'
import {
  Pagination,
  PaginationEllipsis,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev
} from '@/components/ui/pagination'
import { Button } from '@/components/ui/button'
import { useBooks } from '@/lib/composables/useBooks'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const { currentPage, totalBooks, slicedBooks } = useBooks()

const handlePageUpdate = (page: number) => {
  router.push({ query: { ...route.query, page } })
}
</script>

<template>
  <main class="flex flex-col items-center min-h-screen p-4 md:p-8">
    <div class="max-w-screen-lg w-full md:px-2 lg:p-0 flex flex-col gap-4 items-center">
      <search-filters />
      <books-list :items="slicedBooks" />
      <Pagination
        class="w-full flex justify-center"
        v-slot="{ page }"
        :total="totalBooks"
        :sibling-count="1"
        show-edges
        :items-per-page="20"
        :default-page="currentPage"
        :page="currentPage"
        @update:page="handlePageUpdate"
      >
        <PaginationList v-slot="{ items }" class="flex items-center gap-1">
          <PaginationPrev />

          <template v-for="(item, index) in items">
            <PaginationListItem
              v-if="item.type === 'page'"
              :key="index"
              :value="item.value"
              as-child
            >
              <Button class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'">
                {{ item.value }}
              </Button>
            </PaginationListItem>
            <PaginationEllipsis v-else :key="item.type" :index="index" />
          </template>

          <PaginationNext />
        </PaginationList>
      </Pagination>
    </div>
  </main>
</template>
