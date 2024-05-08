<script setup lang="ts">
import { h } from 'vue'
import FTable from '../core/Table/Table.vue'
import type { FTableColumn } from '../core/Table/types'
import { curd } from './curd'

const api = curd('')

const columns: FTableColumn<any>[] = [
  {
    label: 'School ID',
    prop: 'school_id',
  },
  {
    label: 'Name',
    prop: 'name',
    customHeader: (data: { column: any; $index: number }) => {
      return h('span', { style: { color: 'red' } }, data.column.label)
    },
    customCell: (row: any) => {
      return h('span', { style: { color: 'red' } }, row.name)
    },
  },
  {
    label: 'Action',
    prop: 'action',
  },
]
</script>

<template>
  <FTable :api="api" :columns="columns"></FTable>
</template>

<style></style>
