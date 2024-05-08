<script setup lang="ts">
import FTable from '../core/Table/Table.vue'
import type { FTableColumn } from '../core/Table/types'
import { curd } from './curd'

const api = curd('/users')

const columns: FTableColumn<any>[] = [
  {
    label: 'School ID',
    prop: 'school_id',
  },
  {
    label: 'Name',
    prop: 'name',
  },
]
</script>

<template>
  <FTable :api="api" :columns="columns"></FTable>
</template>

<style></style>
