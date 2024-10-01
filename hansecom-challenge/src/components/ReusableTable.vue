<script setup>
import { ref, reactive } from 'vue'

const props = defineProps({
  data: Array,
  columns: Array,
})

import {
  useVueTable,
  FlexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/vue-table'

const filter = ref('');

const tableOptions = reactive({
  get data() {
    return props.data;
  },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  state: {
    get globalFilter() {
      return filter.value
    },
  },
  initialState: {
    pagination: {
      pageSize: 5,
    },
  },
  get columns() {
    return props.columns
  },
});

const table = useVueTable(tableOptions);
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8 bg-white rounded-xl shadow-2xl">
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="my-4">
            <input type="text" class="border border-gray-400 rounded-xl px-4 py-2" placeholder="Search"
              v-model="filter" />
          </div>
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                <th v-for="header in headerGroup.headers" :key="header.id" scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 hover:bg-gray-400 hover:text-white bg-gray-50"
                  :class="{
                    'cursor-pointer select-none': header.column.getCanSort(),
                  }" @click="header.column.getToggleSortingHandler()?.($event)">
                  <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />
                  {{ { asc: ' ↑', desc: '↓' }[header.column.getIsSorted()] }}
                </th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-200">
              <tr v-for="row in table.getRowModel().rows" :key="row.id">
                <td v-for="cell in row.getVisibleCells()" :key="cell.id"
                  class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="mt-8">
        Page {{ table.getState().pagination.pageIndex + 1 }} of
        {{ table.getPageCount() }} -
        {{ table.getFilteredRowModel().rows.length }} results
      </div>
      <div class="space-x-4 mt-8 text-center pb-4">
        <button
          class="hover:bg-gray-700 hover:text-white border bg-gray-50 border-gray-300 rounded px-2 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          @click="table.setPageIndex(0)">
          First page
        </button>

        <button
          class="hover:bg-gray-700 hover:text-white border bg-gray-50 border-gray-300 rounded px-2 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!table.getCanPreviousPage()" @click="table.previousPage()">
          Prev page
        </button>
        <button
          class="hover:bg-gray-700 hover:text-white border bg-gray-50 border-gray-300 rounded px-2 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!table.getCanNextPage()" @click="table.nextPage()">
          Next page
        </button>
        <button
          class="hover:bg-gray-700 hover:text-white border bg-gray-50 border-gray-300 rounded px-2 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          @click="table.setPageIndex(table.getPageCount() - 1)">
          Last page
        </button>
      </div>
    </div>
  </div>
</template>