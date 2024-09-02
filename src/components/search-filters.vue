<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useDebouncedRef } from '@/lib/use-debounce-ref'
import NewBookDialog from '@/components/new-book-dialog.vue'
import { Button } from '@/components/ui/button'
import ActionsMenu from '@/components/actions-menu.vue'
import { EllipsisVertical } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const selectedValue = ref<string>((route.query.integration as string) || 'all')
const inputValue = useDebouncedRef((route.query.query as string) || '', 500)

const handleSelectChange = (value: string) => {
  router.push({
    query: { ...route.query, page: 1, integration: value !== 'all' ? value : undefined }
  })
}

watch(inputValue, (value) => {
  router.push({ query: { ...route.query, page: 1, query: value || undefined } })
})
</script>

<template>
  <Card
    class="w-full gap-2 grid grid-rows-3 md:grid-rows-1 grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_4fr_auto] p-4"
  >
    <ActionsMenu>
      <Button variant="outline" size="icon">
        <EllipsisVertical class="size-5 text-muted-foreground" />
      </Button>
    </ActionsMenu>
    <Select v-model="selectedValue" @update:modelValue="handleSelectChange">
      <SelectTrigger>
        <SelectValue placeholder="Способ интеграции" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Все</SelectItem>
        <SelectItem value="reels">Reels</SelectItem>
        <SelectItem value="stories">Истории</SelectItem>
      </SelectContent>
    </Select>
    <Input
      class="max-md:col-span-2"
      v-model="inputValue"
      placeholder="Начните вводить название или продавца книги"
    />
    <NewBookDialog>
      <Button class="max-md:col-span-2">Создать книгу</Button>
    </NewBookDialog>
  </Card>
</template>
