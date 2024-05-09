import { describe, expect, it } from 'vitest'
// import { mount } from "@vue/test-utils";
// import { FTableColumn } from "../types";
// import FTable from "..";
// import { h } from "vue";

// const api = {
//     getList() {
//         const data = [
//             {
//                 school_id: '123',
//                 name: '张三',
//             },
//             {
//                 school_id: '456',
//                 name: '李四',
//             },
//         ]
//         return Promise.resolve({
//             data,
//             pagination: {
//                 per_page: 10,
//                 total_pages: 5,
//                 total: 50,
//             }
//         })
//     }
// }

// const columns: FTableColumn<any>[] = [
//   {
//     label: 'School ID',
//     prop: 'school_id',
//     search: true,
//     form: {
//       type: 'input',
//       formItem: {
//         rules: [
//           {
//             required: true,
//             message: '请输入学工号',
//             trigger: 'blur',
//           },
//           {
//             min: 3,
//             message: '学工号长度不能小于3',
//             trigger: 'blur',
//           },
//         ],
//       },
//     },
//   },
//   {
//     label: 'Name',
//     prop: 'name',
//     search: true,
//     form: {
//       type: 'cascader',
//       cascader: {
//         options: [
//           {
//             value: 'guide',
//             label: 'Guide',
//             children: [
//               {
//                 value: 'disciplines',
//                 label: 'Disciplines',
//                 children: [
//                   {
//                     value: 'consistency',
//                     label: 'Consistency',
//                   },
//                   {
//                     value: 'feedback',
//                     label: 'Feedback',
//                   },
//                   {
//                     value: 'efficiency',
//                     label: 'Efficiency',
//                   },
//                   {
//                     value: 'controllability',
//                     label: 'Controllability',
//                   },
//                 ],
//               },
//               {
//                 value: 'navigation',
//                 label: 'Navigation',
//                 children: [
//                   {
//                     value: 'side nav',
//                     label: 'Side Navigation',
//                   },
//                   {
//                     value: 'top nav',
//                     label: 'Top Navigation',
//                   },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//     },
//     customHeader: (data: { column: any; $index: number }) => {
//       return h('span', { style: { color: 'red' } }, data.column.label)
//     },
//     customCell: (row: any) => {
//       return h('span', { style: { color: 'red' } }, row.name)
//     },
//   },
//   {
//     label: 'Age',
//     prop: 'age',
//     form: {
//       type: 'input-number',
//     },
//   },
//   {
//     label: 'Action',
//     prop: 'action',
//     btnProps: {
//       link: true,
//     },
//     width: 200,
//   },
// ]

describe('Table', () => {
  // let wrapper: ReturnType<typeof mount>
  // beforeEach(() => {
  //   wrapper = mount(FTable, {
  //     props: {
  //       api,
  //       columns,
  //     },
  //   })
  // })

  it('TODO', () => {
    expect(true).toBe(true)
  })
})
