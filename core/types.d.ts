import { ComponentInstance, VNode } from 'vue'
import {
  CascaderProps,
  CheckboxProps,
  ColorPickerProps,
  DatePickerProps,
  FormItemProps,
  InputNumberProps,
  InputProps,
  ISelectV2Props,
  Options,
  RadioProps,
  RateProps,
  SliderProps,
  SwitchProps,
  TableColumnCtx,
  TransferProps,
  UploadProps,
} from 'element-plus'
import { FilterMethods, Filters } from 'element-plus/es/components/table/src/table-column/defaults'
import { TableOverflowTooltipOptions } from 'element-plus/es/components/table/src/util'

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
    input?: InputProps
    inputNumber?: InputNumberProps
    select?: ISelectV2Props & { options?: Options }
    cascader?: CascaderProps & { panel?: boolean }
    colorPicker?: ColorPickerProps
    datePicker?: DatePickerProps
    radio?: RadioProps
    checkbox?: CheckboxProps
    rate?: RateProps
    slider?: SliderProps
    switch?: SwitchProps
    timePicker?: TimePickerProps
    transfer?: TransferProps
    upload?: UploadProps

    formItem?: FormItemProps
  }
  [key: string]: any
}

export interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}
