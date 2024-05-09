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
  ElSelect,
  ElOption,
} from 'element-plus'
import { JSX } from 'vue/jsx-runtime'
import { FTableColumn, SelectOption } from './types'
import { ref } from 'vue'
import { get, set } from 'lodash-es'

export default function getFormItem(
  api: Record<string, (params: Record<string, any>) => Promise<unknown>>,
  formData: Record<string, any>,
  form: FTableColumn<any>['form'],
  prop: string | string[],
): JSX.Element | null {
  const selectOptions = ref<SelectOption[]>([])

  function search(query: string, key: string, valueKey?: string) {
    api.getList({ [key]: query }).then((res: unknown) => {
      selectOptions.value = (res as any).data.map((item: any) => ({ label: item[key], value: item[valueKey ?? key] }) as SelectOption)
    })
  }

  const key = form?.formItem?.prop ?? prop
  switch (form?.type) {
    case 'input':
      return (
        <ElInput modelValue={get(formData.value, key)} onInput={(v: string | number) => set(formData.value, key, v)} {...form?.input} />
      )
    case 'input-number':
      return (
        <ElInputNumber modelValue={get(formData.value, key)} {...form?.inputNumber} onChange={(v: number) => set(formData.value, key, v)} />
      )
    case 'select':
      selectOptions.value = form?.select?.options ?? []
      return (
        <ElSelect
          modelValue={get(formData.value, key)}
          remote-method={(query: string) => search(query, prop as string, form?.select?.valueKey)}
          {...form?.select}
        >
          {selectOptions.value?.map((o) => <ElOption label={o.label} value={o.value} />)}
        </ElSelect>
      )
    case 'cascader':
      const { panel, ...cascaderProps } = form?.cascader ?? {}
      return panel ? (
        <ElCascaderPanel modelValue={get(formData.value, key)} {...cascaderProps} />
      ) : (
        <ElCascader modelValue={get(formData.value, key)} {...cascaderProps} />
      )
    case 'checkbox':
      return <ElCheckbox modelValue={get(formData.value, key)} {...form?.checkbox} />
    case 'radio':
      return <ElRadio modelValue={get(formData.value, key)} {...form?.radio} />
    case 'date-picker':
      return <ElDatePicker modelValue={get(formData.value, key)} {...form?.datePicker} />
    case 'time-picker':
      return <ElTimePicker modelValue={get(formData.value, key)} {...form?.timePicker} />
    case 'switch':
      return <ElSwitch modelValue={get(formData.value, key)} {...form?.switch} />
    case 'slider':
      return <ElSlider modelValue={get(formData.value, key)} {...form?.slider} />
    case 'rate':
      return <ElRate modelValue={get(formData.value, key)} {...form?.rate} />
    case 'color-picker':
      return <ElColorPicker modelValue={get(formData.value, key)} {...form?.colorPicker} />
    case 'transfer':
      return <ElTransfer modelValue={get(formData.value, key)} {...form?.transfer} />
    case 'upload':
      return <ElUpload modelValue={get(formData.value, key)} {...form?.upload} />

    default:
      return null
  }
}
