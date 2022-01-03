<template>
   <div>
      <div class="p-4">
         <button @click="createCategory" class="px-2 py-1 text-white bg-red-500 rounded">Create Category</button>
      </div>

      <ui-table :header="headerFields" :content="categories">
         <template slot="action" slot-scope="{ item }">
            <button class="px-2 py-1 text-white bg-green-500 rounded" @click="handleEdit(item)">Edit</button>
            <button
               class="px-2 py-1 text-white bg-red-500 rounded"
               @click="handleDelete(item.id)"
            >Delete</button>
         </template>
      </ui-table>
   </div>
</template>

<script>

import { mapActions } from 'vuex'
import CrudMixin from '~/mixins/CrudMixin'
import UiTable from '~/components/ui/UiTable.vue'

export default {
   components: { UiTable },

   mixins: [CrudMixin],

   async asyncData({ app }) {
      const response = await app.$axios.get('/api/admin/categories?index=true')
      const { data, meta, links } = response.data
      return {
         categories: data,
         links,
         meta
      }
   },

   data: () => ({
      headerFields: ['#', 'Name', 'Parent', 'Slug', 'Actions'],

      crudName: 'category',

      categories: [],

      meta: {},

      links: {},
   }),

   methods: {
      ...mapActions('categories', {
         destroy: 'destroy',
      }),

      createCategory() {
         this.$router.push('/admin/categories/create')
      },

      handleEdit(category) {
         this.$router.push(`/admin/categories/${category.slug}`)
      }
   }
}
</script>
