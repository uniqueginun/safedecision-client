<template>
   <div v-if="loading">loading...</div>
   <table v-else class="w-full text-left border-collapse">
      <thead class="border-b">
         <tr>
            <ui-table-td v-for="(item, index) of header" :key="index" :type="'th'">{{ item }}</ui-table-td>
         </tr>
      </thead>
      <tbody>
         <tr class="hover:bg-gray-200" v-for="(item, index) of content" :key="index">
            <ui-table-td v-for="(field, key) of Object.keys(item)" :key="key">{{ item[field] }}</ui-table-td>
            <ui-table-td><slot name="action" :item="item"></slot></ui-table-td>
         </tr>
      </tbody>
   </table>
</template>

<script>
import UiTableTd from './UiTableTd.vue'
export default {
   components: { UiTableTd },

   props: {
      loading: {
         type: Boolean,
         default: false,
      },
      header: {
         type: Array,
         required: true,
      },
      content: {
         type: Array,
         required: true,
      },
   },
}
</script>