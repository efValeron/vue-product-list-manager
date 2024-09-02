<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { ref } from 'vue'
import type { Book } from '@/lib/types'

type Props = {
  book: Book
}

const open = ref(false)

const props = defineProps<Props>()

const handleDelete = () => {
  const books = (JSON.parse(localStorage.getItem('books') || 'null') as Book[] | null) || []
  if (books) {
    const newBooks = books.filter((book) => book.id !== props.book.id)
    localStorage.setItem('books', JSON.stringify(newBooks))
  }

  location.reload()
}
</script>

<template>
  <AlertDialog :open="open" @update:open="open = $event">
    <AlertDialogTrigger as-child>
      <slot />
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Вы уверены что хотите удалить книгу?</AlertDialogTitle>
        <AlertDialogDescription
          >Вы пытаетесь удалить книгу
          <span class="italic font-medium">"{{ props.book.title }}"</span>.<br />
          Это действие нельзя отменить!</AlertDialogDescription
        >
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Отмена</AlertDialogCancel>
        <Button variant="destructive" @click="handleDelete">Да, удалить</Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
