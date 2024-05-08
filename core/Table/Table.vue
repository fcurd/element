<script setup lang="ts">
import { PaginationProps, TableColumnCtx, useLocale, type TableProps } from 'element-plus'
import { onMounted, ref, watchEffect } from 'vue'
import { i18n } from '../constants'

const props = defineProps<{
  title?: string
  api: any
  columns: TableColumnCtx<any>[]
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
      <el-table-column v-for="c in props.columns" :key="c.prop" v-bind="c" />
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
