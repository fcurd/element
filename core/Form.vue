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

const props = defineProps<{
  formLabelPosition?: 'left' | 'right' | 'top'
  columns: FTableColumn<any>[]
  api: Record<string, (params: Record<string, any>) => Promise<unknown>>
  inline?: boolean
}>()

const formData = defineModel<Record<string, any>>('data', { required: true })
const selectOptions = ref<SelectOption[]>([])

function search(key: string, valueKey: string, query: string) {
  props.api.getList({ [key]: query }).then((res: { data: SelectOption[] }) => {
    selectOptions.value = res.data.map((item: SelectOption) => ({ label: item[key], value: item[valueKey ?? key] }))
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
    return <form.type v-model={formData.value[form?.formItem?.prop ?? prop]} column={p.column} />
  }
  switch (form?.type) {
    case 'input':
      item = <ElInput v-model={formData.value[form?.formItem?.prop ?? prop]} {...form?.input} />
      break
    case 'input-number':
      item = <ElInputNumber v-model={formData.value[form?.formItem?.prop ?? prop]} {...form?.inputNumber} />
      break
    case 'select':
      selectOptions.value = form?.select?.options ?? []
      item = (
        <ElSelect
          v-model={formData.value[form?.formItem?.prop ?? prop]}
          remote-method={(query: string) => search(prop, form?.select?.valueKey, query)}
          {...form?.select}
        >
          {selectOptions.value?.map((o) => <ElOption label={o.label} value={o.value} />)}
        </ElSelect>
      )
      break
    case 'cascader':
      const { panel, ...cascaderProps } = form?.cascader ?? {}
      item = panel ? (
        <ElCascaderPanel v-model={formData.value[form?.formItem?.prop ?? prop]} {...cascaderProps} />
      ) : (
        <ElCascader v-model={formData.value[form?.formItem?.prop ?? prop]} {...cascaderProps} />
      )
      break
    case 'checkbox':
      item = <ElCheckbox v-model={formData.value[form?.formItem?.prop ?? prop]} {...form?.checkbox} />
      break
    case 'radio':
      item = <ElRadio v-model={formData.value[form?.formItem?.prop ?? prop]} {...form?.radio} />
      break
    case 'date-picker':
      item = <ElDatePicker v-model={formData.value[form?.formItem?.prop ?? prop]} {...form?.datePicker} />
      break
    case 'time-picker':
      item = <ElTimePicker v-model={formData.value[form?.formItem?.prop ?? prop]} {...form?.timePicker} />
      break
    case 'switch':
      item = <ElSwitch v-model={formData.value[form?.formItem?.prop ?? prop]} {...form?.switch} />
      break
    case 'slider':
      item = <ElSlider v-model={formData.value[form?.formItem?.prop ?? prop]} {...form?.slider} />
      break
    case 'rate':
      item = <ElRate v-model={formData.value[form?.formItem?.prop ?? prop]} {...form?.rate} />
      break
    case 'color-picker':
      item = <ElColorPicker v-model={formData.value[form?.formItem?.prop ?? prop]} {...form?.colorPicker} />
      break
    case 'transfer':
      item = <ElTransfer v-model={formData.value[form?.formItem?.prop ?? prop]} {...form?.transfer} />
      break
    case 'upload':
      item = <ElUpload v-model={formData.value[form?.formItem?.prop ?? prop]} {...form?.upload} />
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
