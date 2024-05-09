<script setup lang="ts">
import { h } from 'vue'
import FTable from '../core/Table.vue'
import type { FTableColumn } from '../core/types'
import { curd } from './curd'

const api = curd('')

const columns: FTableColumn<any>[] = [
  {
    label: 'School ID',
    prop: 'school_id',
    search: true,
    form: {
      type: 'input',
      formItem: {
        rules: [
          {
            required: true,
            message: '请输入学工号',
            trigger: 'blur',
          },
          {
            min: 3,
            message: '学工号长度不能小于3',
            trigger: 'blur',
          },
        ],
      },
    },
  },
  {
    label: 'Name',
    prop: 'name',
    search: true,
    form: {
      type: 'cascader',
      cascader: {
        options: [
          {
            value: 'guide',
            label: 'Guide',
            children: [
              {
                value: 'disciplines',
                label: 'Disciplines',
                children: [
                  {
                    value: 'consistency',
                    label: 'Consistency',
                  },
                  {
                    value: 'feedback',
                    label: 'Feedback',
                  },
                  {
                    value: 'efficiency',
                    label: 'Efficiency',
                  },
                  {
                    value: 'controllability',
                    label: 'Controllability',
                  },
                ],
              },
              {
                value: 'navigation',
                label: 'Navigation',
                children: [
                  {
                    value: 'side nav',
                    label: 'Side Navigation',
                  },
                  {
                    value: 'top nav',
                    label: 'Top Navigation',
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    customHeader: (data: { column: any; $index: number }) => {
      return h('span', { style: { color: 'red' } }, data.column.label)
    },
    customCell: (row: any) => {
      return h('span', { style: { color: 'red' } }, row.name)
    },
  },
  {
    label: 'Age',
    prop: 'age',
    form: {
      type: 'input-number',
    },
  },
  {
    label: 'Action',
    prop: 'action',
    btnProps: {
      link: true,
    },
    width: 200,
  },
]
</script>

<template>
  <FTable :api="api" :columns="columns"></FTable>
</template>

<style></style>
