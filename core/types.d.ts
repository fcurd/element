import { ComponentInstance, VNode } from 'vue'
import {
  cascaderProps,
  CheckboxProps,
  ColorPickerProps,
  DatePickerProps,
  FormItemProps,
  InputNumberProps,
  InputProps,
  Options,
  RadioProps,
  RateProps,
  SelectProps,
  SliderProps,
  SwitchProps,
  TableColumnCtx,
  TimePickerDefaultProps,
  TransferProps,
  UploadProps,
} from 'element-plus'
import { FilterMethods, Filters } from 'element-plus/es/components/table/src/table-column/defaults'
import { TableOverflowTooltipOptions } from 'element-plus/es/components/table/src/util'
import type { ExtractPublicPropTypes } from 'vue'
import { SelectProps } from 'element-plus/es/components/select-v2/src/defaults.mjs'

interface BaseColumn<T> {
  type?: string
  prop: string | string[]
  label: string
  className?: string
  labelClassName?: string
  width?: string | number
  minWidth?: string | number
  sortable?: boolean | string
  sortMethod?: (a: T, b: T) => number
  sortBy?: string | ((row: T, index: number) => string) | string[]
  sortOrders?: ('ascending' | 'descending' | null)[]
  resizable?: boolean
  columnKey?: string
  align?: string
  headerAlign?: string
  showOverflowTooltip?: boolean | TableOverflowTooltipOptions
  fixed?: boolean | string
  formatter?: (row: T, column: TableColumnCtx<T>, cellValue: any, index: number) => VNode | string
  selectable?: (row: T, index: number) => boolean
  reserveSelection?: boolean
  filterMethod?: FilterMethods<T>
  filteredValue?: string[]
  filters?: Filters
  filterPlacement?: string
  filterMultiple?: boolean
  filterClassName?: string
  index?: number | ((index: number) => number)
}

export interface FTableColumn<T> extends BaseColumn<T> {
  customHeader?: (data: CI<T>) => VNode
  customCell?: (data: any) => VNode
  search?: boolean
  form?: {
    type:
      | 'input'
      | 'input-number'
      | 'select'
      | 'date-picker'
      | 'time-picker'
      | 'number'
      | 'textarea'
      | 'radio'
      | 'checkbox'
      | 'switch'
      | 'rate'
      | 'slider'
      | 'upload'
      | 'cascader'
      | 'transfer'
      | ((column: FTableColumn<any>) => VNode | JSX.Element)
      | ComponentInstance<any>
    input?: ExtractPublicPropTypes<InputProps>
    inputNumber?: ExtractPublicPropTypes<InputNumberProps>
    select?: ExtractPublicPropTypes<SelectProps> & { options?: Options }
    cascader?: ExtractPublicPropTypes<typeof cascaderProps> & { panel?: boolean }
    colorPicker?: ExtractPublicPropTypes<ColorPickerProps>
    datePicker?: ExtractPublicPropTypes<DatePickerProps>
    radio?: ExtractPublicPropTypes<RadioProps>
    checkbox?: ExtractPublicPropTypes<CheckboxProps>
    rate?: ExtractPublicPropTypes<RateProps>
    slider?: ExtractPublicPropTypes<SliderProps>
    switch?: ExtractPublicPropTypes<SwitchProps>
    timePicker?: ExtractPublicPropTypes<TimePickerDefaultProps>
    transfer?: ExtractPublicPropTypes<TransferProps>
    upload?: ExtractPublicPropTypes<UploadProps>

    formItem?: ExtractPublicPropTypes<FormItemProps>
  }
  [key: string]: any
}

export interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}
