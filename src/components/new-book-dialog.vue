<script setup lang="ts">
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { ref } from 'vue'
import { uuid } from 'vue-uuid'
import type { BookFormData } from '@/components/book-form.vue'
import BookForm from '@/components/book-form.vue'
import type { Book } from '@/lib/types'

const open = ref(false)

const onSubmit = (values: BookFormData) => {
  const books = (JSON.parse(localStorage.getItem('books') || 'null') as Book[]) || []
  localStorage.setItem(
    'books',
    JSON.stringify([
      {
        id: uuid.v1(),
        title: values.title,
        seller: values.seller || 'Не указан',
        integration: values.integration
      },
      ...books
    ])
  )

  location.reload()
}
</script>

<template>
  <Dialog :open="open" @update:open="open = $event">
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <BookForm :on-submit="onSubmit" />
    </DialogContent>
  </Dialog>
</template>
