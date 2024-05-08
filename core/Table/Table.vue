<script setup lang="tsx">
import { PaginationProps, useLocale, type TableProps } from 'element-plus'
import { VNode, onMounted, ref, watchEffect } from 'vue'
import { i18n } from '../constants'
import { FTableColumn } from './types'

const props = defineProps<{
  title?: string
  api: any
  columns: FTableColumn<any>[]
  tableConfig?: TableProps<any[]>
  pagination?: PaginationProps
}>()
const data = ref([])
const currentPage = ref<number>(1)
const total = ref<number>(1)

const { lang } = useLocale()

function getList() {
  props.api.getList({ page: currentPage.value, pageSize: props.pagination?.pageSize ?? 10 }).then((res: any) => {
    data.value = res.data
    total.value = res.pagination.total
  })
}

function CustomRender(props: { node: VNode }) {
  return props.node
}

watchEffect(getList)

onMounted(getList)
</script>

<template>
  <el-card>
    <template #header>
      <div class="header">
        <span>{{ props.title ?? i18n[lang].list }}</span>
        <div class="action-box">
          <el-button type="primary" link>{{ i18n[lang].add }}</el-button>
          <slot name="action" />
        </div>
      </div>
    </template>
    <el-table :data="data">
      <el-table-column v-for="c in props.columns" :key="c.prop" v-bind="c">
        <template #header="scope" v-if="c.customHeader">
          <CustomRender :node="c.customHeader({ column: c, index: scope.$index })" />
        </template>
        <template #default v-if="c.prop === 'action' && !c.customCell">
          <el-button size="small"> Edit </el-button>
          <el-button size="small" type="danger"> Delete </el-button>
        </template>
        <template #default="scope" v-else-if="c.customCell">
          <CustomRender :node="c.customCell(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <el-pagination class="pagination" layout="prev, pager, next" :total="total" v-model:current-page="currentPage" />
    </template>
  </el-card>
</template>

<style scope>
.header {
  display: flex;
  justify-content: space-between;
}

.pagination {
  display: flex;
  justify-content: end;
}
</style>
