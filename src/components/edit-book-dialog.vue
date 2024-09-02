<script setup lang="ts">
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { ref } from 'vue'
import type { BookFormData } from '@/components/book-form.vue'
import BookForm from '@/components/book-form.vue'
import type { Book } from '@/lib/types'

type Props = {
  book: Book
}

const props = defineProps<Props>()

const open = ref(false)

const onSubmit = (values: BookFormData) => {
  const books = (JSON.parse(localStorage.getItem('books') || 'null') as Book[]) || []

  const updatedBooks = books.map((book) =>
    book.id === props.book.id
      ? {
          ...book,
          title: values.title,
          seller: values.seller || 'Не указан',
          integration: values.integration
        }
      : book
  )

  localStorage.setItem('books', JSON.stringify(updatedBooks))

  location.reload()
}
</script>

<template>
  <Dialog :open="open" @update:open="open = $event">
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <BookForm :on-submit="onSubmit" :default-values="props.book" submitButtonText="Сохранить" />
    </DialogContent>
  </Dialog>
</template>
