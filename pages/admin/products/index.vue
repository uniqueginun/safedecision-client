<template>
   <div class="mt-4">

      <div class="p-4">
         <button @click="$router.push('/admin/products/create')" class="px-2 py-1 text-white bg-red-500 rounded">Create Product</button>
      </div>

      <ui-table :header="headerFields" :content="products" :loading="false">
         <template #body>
            <tr class="hover:bg-gray-200" v-for="({id, name, price, company, category}) of products" :key="id">
               <ui-table-td>{{ id }}</ui-table-td>
               <ui-table-td>{{ name }}</ui-table-td>
               <ui-table-td>{{ price }}</ui-table-td>
               <ui-table-td>{{ company.name }}</ui-table-td>
               <ui-table-td>{{ category.name }}</ui-table-td>
               <ui-table-td>6</ui-table-td>
            </tr>
         </template>
         <template slot="action" slot-scope="{ item }">
            <button class="px-2 py-1 text-white bg-green-500 rounded">Edit</button>
            <button
               class="px-2 py-1 text-white bg-red-500 rounded"
               :id="`delete-${item.id}`"
            >Delete</button>
         </template>
      </ui-table>
   </div>
</template>

<script>

import UiTable from '~/components/ui/UiTable.vue'
import UiTableTd from '~/components/ui/UiTableTd.vue'
import CrudMixin from '~/mixins/CrudMixin'

export default {
   components: { UiTable, UiTableTd },   

   mixins: [CrudMixin],

   async asyncData({ app }) {
      const { data } = await app.$axios.get('/api/admin/products')

      return {
         products: data.data
      }
   },

   data: () => ({
      headerFields: ['#', 'Name', 'Price', 'Company', 'Category', 'Actions'],
      products: [],
      crudName: 'company',
   }),
}
</script>
