<script setup lang="tsx">
import {
  ElUpload,
  ElTransfer,
  ElColorPicker,
  ElTimePicker,
  ElSwitch,
  ElCheckbox,
  ElSlider,
  ElRate,
  ElCascader,
  ElRadio,
  ElDatePicker,
  ElCascaderPanel,
  ElInput,
  ElInputNumber,
  ElFormItem,
  ElSelect,
  ElOption,
} from 'element-plus'
import { FTableColumn, SelectOption } from './types'
import { ref, defineProps } from 'vue'
import { get, set } from 'lodash-es'

const props = defineProps<{
  formLabelPosition?: 'left' | 'right' | 'top'
  columns: FTableColumn<any>[]
  api: Record<string, (params: Record<string, any>) => Promise<unknown>>
  inline?: boolean
}>()

const formData = defineModel<Record<string, any>>('data', { required: true })
const selectOptions = ref<SelectOption[]>([])

function search(query: string, key: string, valueKey?: string) {
  props.api.getList({ [key]: query }).then((res: unknown) => {
    selectOptions.value = (res as any).data.map((item: any) => ({ label: item[key], value: item[valueKey ?? key] }) as SelectOption)
  })
}

function FormItemRender(p: { column: FTableColumn<any> }) {
  let item

  const { label, prop, form } = p.column

  // Support custom render function
  if (typeof form?.type === 'function') {
    return form.type(p.column)
  }

  // Support custom component, but need to pass column to component and define model for it
  if (typeof form?.type === 'object' && form?.type?.name) {
    return <form.type value={get(formData.value, form?.formItem?.prop ?? prop)} column={p.column} />
  }
  const key = form?.formItem?.prop ?? prop
  switch (form?.type) {
    case 'input':
      item = (
        <ElInput modelValue={get(formData.value, key)} onInput={(v: string | number) => set(formData.value, key, v)} {...form?.input} />
      )
      break
    case 'input-number':
      item = (
        <ElInputNumber modelValue={get(formData.value, key)} {...form?.inputNumber} onChange={(v: number) => set(formData.value, key, v)} />
      )
      break
    case 'select':
      selectOptions.value = form?.select?.options ?? []
      item = (
        <ElSelect
          modelValue={get(formData.value, key)}
          remote-method={(query: string) => search(query, prop as string, form?.select?.valueKey)}
          {...form?.select}
        >
          {selectOptions.value?.map((o) => <ElOption label={o.label} value={o.value} />)}
        </ElSelect>
      )
      break
    case 'cascader':
      const { panel, ...cascaderProps } = form?.cascader ?? {}
      item = panel ? (
        <ElCascaderPanel modelValue={get(formData.value, key)} {...cascaderProps} />
      ) : (
        <ElCascader modelValue={get(formData.value, key)} {...cascaderProps} />
      )
      break
    case 'checkbox':
      item = <ElCheckbox modelValue={get(formData.value, key)} {...form?.checkbox} />
      break
    case 'radio':
      item = <ElRadio modelValue={get(formData.value, key)} {...form?.radio} />
      break
    case 'date-picker':
      item = <ElDatePicker modelValue={get(formData.value, key)} {...form?.datePicker} />
      break
    case 'time-picker':
      item = <ElTimePicker modelValue={get(formData.value, key)} {...form?.timePicker} />
      break
    case 'switch':
      item = <ElSwitch modelValue={get(formData.value, key)} {...form?.switch} />
      break
    case 'slider':
      item = <ElSlider modelValue={get(formData.value, key)} {...form?.slider} />
      break
    case 'rate':
      item = <ElRate modelValue={get(formData.value, key)} {...form?.rate} />
      break
    case 'color-picker':
      item = <ElColorPicker modelValue={get(formData.value, key)} {...form?.colorPicker} />
      break
    case 'transfer':
      item = <ElTransfer modelValue={get(formData.value, key)} {...form?.transfer} />
      break
    case 'upload':
      item = <ElUpload modelValue={get(formData.value, key)} {...form?.upload} />
      break

    default:
      return
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
