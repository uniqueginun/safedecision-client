<template>
   <div class="mt-4">
      <div class="p-4">
         <a class="btn btn-danger" href="/admin/products/create">Create Product</a>
      </div>

      <ui-table :header="headerFields" :content="products" :loading="false">
         <template #body>
            <tr
               class="hover:bg-gray-200"
               v-for="({ id, name, formatted_price, company, category, slug }) of products"
               :key="id"
            >
               <ui-table-td>{{ id }}</ui-table-td>
               <ui-table-td>{{ name }}</ui-table-td>
               <ui-table-td>{{ formatted_price }}</ui-table-td>
               <ui-table-td>{{ company.name }}</ui-table-td>
               <ui-table-td>{{ category.name }}</ui-table-td>
               <ui-table-td>
                  <nuxt-link
                     :to="`/admin/products/${slug}`"
                     class="px-2 py-1 text-white bg-green-500 rounded"
                  >
                     <i class="fas fa-edit"></i>
                  </nuxt-link>
                  <button
                     @click="handleDelete(id)"
                     class="px-2 py-1 text-white bg-red-500 rounded"
                  >
                     <i class="fas fa-trash"></i>
                  </button>
               </ui-table-td>
            </tr>
         </template>
      </ui-table>
   </div>
</template>

<script>
import { mapActions } from 'vuex'
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

   methods: {
      ...mapActions('products', {
         destroy: 'destroy',
      }),
   }
}
</script>
