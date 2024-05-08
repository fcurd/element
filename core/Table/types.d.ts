import { VNode } from 'vue'

interface BaseColumn<T> {
  type?: string
  prop: string
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
  [key: string]: any
}
