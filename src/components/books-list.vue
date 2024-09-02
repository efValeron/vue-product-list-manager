<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Card } from '@/components/ui/card'
import { ArrowDownAZ, ArrowDownUp, ArrowUpAZ, Pencil, Trash } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import DeleteBookAlertDialog from '@/components/delete-book-alert-dialog.vue'
import EditBookDialog from '@/components/edit-book-dialog.vue'
import { useSort } from '@/lib/composables/useSort'
import type { Book } from '@/lib/types'

type Props = {
  items: Book[]
}

const props = defineProps<Props>()

const { sortBy, sortDirection, cycleSort } = useSort()

const cycleTitleSort = () => cycleSort('title')
const cycleSellerSort = () => cycleSort('seller')
</script>

<template>
  <Card class="w-full">
    <Table>
      <TableHeader>
        <TableRow class="hover:bg-background">
          <TableHead
            class="w-5/12 min-w-32 hover:text-foreground transition-colors duration-200 hover:bg-muted/80 cursor-pointer"
            :class="sortBy === 'title' && 'bg-primary/[0.04]'"
            @click="cycleTitleSort"
          >
            Название
            <ArrowDownAZ
              v-if="sortBy === 'title' && sortDirection === 'az'"
              class="ml-1 size-4 inline"
              :class="sortBy === 'title' && 'text-primary'"
            />
            <ArrowUpAZ
              v-else-if="sortBy === 'title' && sortDirection === 'za'"
              class="ml-1 size-4 inline"
              :class="sortBy === 'title' && 'text-primary'"
            />
            <ArrowDownUp v-else class="ml-1 size-4 inline" />
          </TableHead>
          <TableHead
            class="w-4/12 min-w-32 hover:text-foreground transition-colors duration-200 hover:bg-muted/80 cursor-pointer"
            :class="sortBy === 'seller' && 'bg-primary/[0.04]'"
            @click="cycleSellerSort"
          >
            Продавец
            <ArrowDownAZ
              v-if="sortBy === 'seller' && sortDirection === 'az'"
              class="ml-1 size-4 inline"
              :class="sortBy === 'seller' && 'text-primary'"
            />
            <ArrowUpAZ
              v-else-if="sortBy === 'seller' && sortDirection === 'za'"
              class="ml-1 size-4 inline"
              :class="sortBy === 'seller' && 'text-primary'"
            />
            <ArrowDownUp v-else class="ml-1 size-4 inline" />
          </TableHead>
          <TableHead class="w-4/12">Способ интеграции</TableHead>
          <TableHead class="w-[92px]" />
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          v-if="props.items.length > 0"
          v-for="item in props.items"
          :key="item.id"
          class="hover:bg-background"
        >
          <TableCell class="font-medium" :class="sortBy === 'title' && 'bg-primary/[0.04]'">
            {{ item.title }}
          </TableCell>
          <TableCell :class="sortBy === 'seller' && 'bg-primary/[0.04]'">{{
            item.seller
          }}</TableCell>
          <TableCell>{{ item.integration === 'stories' ? 'История' : 'Reels' }}</TableCell>
          <TableCell class="flex gap-1">
            <EditBookDialog :book="item">
              <Button size="icon" variant="ghost" class="size-7">
                <Pencil class="size-4 text-primary" />
              </Button>
            </EditBookDialog>
            <DeleteBookAlertDialog :book="item">
              <Button size="icon" variant="ghost" class="size-7">
                <Trash class="size-4 text-destructive" />
              </Button>
            </DeleteBookAlertDialog>
          </TableCell>
        </TableRow>
        <TableRow v-else class="hover:bg-background">
          <TableCell class="text-center text-muted-foreground font-medium" colspan="4">
            Ничего не найдено
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </Card>
</template>
