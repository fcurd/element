<script setup lang="tsx">
import { ElFormItem } from 'element-plus'
import { FTableColumn } from './types'
import { get } from 'lodash-es'
import getFormItem from './form_controls'

const props = defineProps<{
  formLabelPosition?: 'left' | 'right' | 'top'
  columns: FTableColumn<any>[]
  api: Record<string, (params: Record<string, any>) => Promise<unknown>>
  inline?: boolean
}>()

const formData = defineModel<Record<string, any>>('data', { required: true })

function FormItemRender(p: { column: FTableColumn<any> }) {
  let item

  const { label, prop, form } = p.column

  // Support custom render function
  if (typeof form?.type === 'function') {
    item = form.type(formData, p.column)
  }
  // Support custom component, but need to pass column to component and define model for it
  else if (typeof form?.type === 'object' && form?.type?.name) {
    item = <form.type modelValue={get(formData.value, form?.formItem?.prop ?? prop)} column={p.column} />
  } else {
    item = getFormItem(props.api, formData, form, prop)
  }

  return (
    <ElFormItem {...form?.formItem} label={form?.formItem?.label ?? label} prop={form?.formItem?.prop ?? prop}>
      {item}
    </ElFormItem>
  )
}
</script>

<template>
  <el-form :model="formData" label-width="auto" :label-position="formLabelPosition ?? 'right'" :inline="props.inline">
    <form-item-render v-for="c in props.columns" :key="c.prop" :column="c" />
  </el-form>
</template>
