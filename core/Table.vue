<script setup lang="tsx">
import { type PaginationProps, useLocale, type TableProps } from 'element-plus'
import { type VNode, onMounted, ref, watchEffect, defineProps, computed, reactive } from 'vue'
import { i18n } from './i18n'
import { FTableColumn } from './types'
import Form from './Form.vue'
import { assign, cloneDeep } from 'lodash-es'

const props = defineProps<{
  title?: string
  api: Record<string, (params: Record<string, any>) => Promise<unknown>>
  formLabelPosition?: 'left' | 'right' | 'top'
  columns: FTableColumn<any>[]
  tableConfig?: TableProps<any[]>
  pagination?: PaginationProps
}>()

const data = ref([])
const formVisible = ref(false)
const formData = ref({})
const mode = ref('add')
const searchFormData = reactive({})
const currentPage = ref<number>(1)
const pagination = reactive(
  assign({ total: 0, layout: 'prev, pager, next, total', pageSizes: [10, 20, 30, 40, 50, 100] }, props.pagination),
)
const pageSize = ref(10)

const searchColumns = computed(() => {
  return props.columns.filter((item) => {
    if (item.search) {
      searchFormData[item.prop as string] = undefined
    }
    return item.search
  })
})

const { lang } = useLocale()

function getData(params?: Record<string, any>) {
  props.api.getList({ page: currentPage.value, pageSize: props.pagination?.pageSize ?? 10, ...params }).then((res: any) => {
    data.value = res.data
    const { total, per_page, total_pages } = res.pagination
    pagination.pageCount = total_pages
    pagination.total = total
    pagination.pageSize = per_page
  })
}
function handleAdd() {
  formVisible.value = true
  mode.value = 'add'
  formData.value = {}
}
function handleEdit(row: any) {
  formVisible.value = true
  mode.value = 'edit'
  formData.value = cloneDeep(row)
}

function handleSave() {
  let saveFn = props.api.update

  if (mode.value === 'add') {
    saveFn = props.api.create
  }

  saveFn(formData.value).then(() => {
    getData()
    formVisible.value = false
  })
}

function CustomRender(props: { node: VNode }) {
  return props.node
}

watchEffect(getData)
watchEffect(() => getData(searchFormData))

onMounted(getData)
</script>

<template>
  <el-card>
    <template #header>
      <div class="header">
        <span>{{ props.title ?? i18n[lang].list }}</span>
        <div class="action-box">
          <el-button type="primary" link @click="handleAdd">{{ i18n[lang].add }}</el-button>
          <slot name="action" />
        </div>
      </div>
    </template>
    <Form inline :columns="searchColumns" v-model:data="searchFormData" :api="props.api" />
    <el-table :data="data">
      <el-table-column v-for="c in props.columns" :key="c.prop" v-bind="c">
        <template #header="scope" v-if="c.customHeader">
          <CustomRender :node="c.customHeader({ column: c, index: scope.$index })" />
        </template>
        <template #default="scope" v-if="c.prop === 'action' && !c.customCell">
          <el-button v-bind="c.btnProps" type="primary" @click="handleEdit(scope.row)"> {{ i18n[lang].edit }} </el-button>
          <el-popconfirm :title="i18n[lang].confirmDelete">
            <template #reference>
              <el-button v-bind="c.btnProps" type="danger"> {{ i18n[lang].delete }} </el-button>
            </template>
          </el-popconfirm>
        </template>
        <template #default="scope" v-else-if="c.customCell">
          <CustomRender :node="c.customCell(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <el-pagination class="pagination" v-bind="pagination" v-model:current-page="currentPage" v-model:page-size="pageSize" />
    </template>
  </el-card>

  <el-dialog :title="i18n[lang][mode]" v-model="formVisible">
    <Form :columns="props.columns" :data="formData" :api="props.api" :form-label-position="props.formLabelPosition" />
    <template #footer>
      <el-button @click="formVisible = false">{{ i18n[lang].cancel }}</el-button>
      <el-button type="primary" @click="handleSave">
        {{ i18n[lang].confirm }}
      </el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
}

.pagination {
  display: flex;
  justify-content: end;
}
</style>
