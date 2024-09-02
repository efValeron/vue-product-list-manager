<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { ListPlus, Trash } from 'lucide-vue-next'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { ref } from 'vue'
import { BooksTestList } from '@/lib/books-test-list'
import type { Book } from '@/lib/types'

const deleteAlertOpen = ref(false)
const testDataAlertOpen = ref(false)

const insertTestData = () => {
  const books = (JSON.parse(localStorage.getItem('books') || 'null') as Book[]) || []

  localStorage.setItem('books', JSON.stringify([...books, ...BooksTestList]))

  location.reload()
}

const handleAllBooksDelete = () => {
  localStorage.removeItem('books')

  location.reload()
}
</script>

<template>
  <TooltipProvider>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <slot />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Tooltip>
          <TooltipTrigger as-child>
            <DropdownMenuItem class="cursor-pointer flex gap-2" @click="testDataAlertOpen = true">
              <ListPlus class="size-5 text-muted-foreground" />
              <span>Вставить тестовые данные</span>
            </DropdownMenuItem>
          </TooltipTrigger>
          <TooltipContent side="right" :side-offset="10"
            >Данные вставятся после уже существующих
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as-child>
            <DropdownMenuItem class="cursor-pointer flex gap-2" @click="deleteAlertOpen = true">
              <Trash class="size-4 text-muted-foreground" />
              <span>Удалить все данные</span>
            </DropdownMenuItem>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            :side-offset="10"
            class="bg-destructive text-destructive-foreground"
            >Это действие необратимо
          </TooltipContent>
        </Tooltip>
      </DropdownMenuContent>
    </DropdownMenu>

    <!-- Диалог вставки тестовых данных -->
    <AlertDialog :open="testDataAlertOpen" @update:open="testDataAlertOpen = $event">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Вы уверены что хотите вставить тестовые данные?</AlertDialogTitle>
          <AlertDialogDescription>
            Тестовые данные вставятся после уже существующих.<br />
            Всего тестовых книг 144.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction @click="insertTestData">Вставить данные</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    <!-- Диалог удаления всех данных -->
    <AlertDialog :open="deleteAlertOpen" @update:open="deleteAlertOpen = $event">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Вы уверены что хотите удалить все данные?</AlertDialogTitle>
          <AlertDialogDescription
            >Еще раз подумайте перед удалением всех данных.<br />
            Это действие нельзя отменить!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <Button variant="destructive" @click="handleAllBooksDelete">Да, удалить</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </TooltipProvider>
</template>
