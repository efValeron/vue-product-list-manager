<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export type BookFormData = { title: string; seller?: string; integration: 'reels' | 'stories' }

type Props = {
  onSubmit: (values: BookFormData) => void
  submitButtonText?: string
  defaultValues?: Partial<BookFormData>
}

const props = defineProps<Props>()

const formSchema = toTypedSchema(
  z.object({
    title: z
      .string({ required_error: 'Необходимо указать название' })
      .min(1, { message: 'Необходимо указать название' })
      .max(50, { message: 'Название должно быть не более 50 символов' }),
    seller: z.string().optional(),
    integration: z.enum(['reels', 'stories'], {
      required_error: 'Необходимо указать способ интеграции'
    })
  })
)

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    ...props.defaultValues,
    seller: props.defaultValues?.seller === 'Не указан' ? '' : props.defaultValues?.seller
  }
})

const onSubmit = form.handleSubmit((values) => props.onSubmit(values))
</script>

<template>
  <form @submit="onSubmit" class="space-y-4">
    <DialogHeader>
      <DialogTitle>Создать новую книгу</DialogTitle>
      <DialogDescription> Здесь вы можете создать новую книгу.</DialogDescription>
    </DialogHeader>
    <FormField v-slot="{ componentField }" name="title">
      <FormItem>
        <FormLabel>Название книги</FormLabel>
        <FormControl>
          <Input type="text" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="seller">
      <FormItem>
        <FormLabel>Продавец</FormLabel>
        <FormControl>
          <Input type="text" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="integration">
      <RadioGroup class="flex flex-col space-y-1" v-bind="componentField">
        <FormLabel>Способ интеграции</FormLabel>
        <FormItem class="flex items-center space-y-0 gap-x-3">
          <FormControl>
            <RadioGroupItem value="reels" />
          </FormControl>
          <FormLabel class="font-normal">Reels</FormLabel>
        </FormItem>
        <FormItem class="flex items-center space-y-0 gap-x-3">
          <FormControl>
            <RadioGroupItem value="stories" />
          </FormControl>
          <FormLabel class="font-normal">История</FormLabel>
        </FormItem>
      </RadioGroup>
    </FormField>

    <DialogFooter>
      <Button type="submit">{{ props.submitButtonText || 'Создать' }}</Button>
    </DialogFooter>
  </form>
</template>
