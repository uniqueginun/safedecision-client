<template>
   <div>
      <global-modal :name="modalName" @before-open="beforeOpen" @closed="crudItem = null">
         <CreateForm
            v-if="crudItem"
            :company="crudItem"
            @cancel="closeModal"
            @updated="actionPerformed"
         />
      </global-modal>

      <div class="p-4">
         <button
            @click="showCreateModal"
            class="px-2 py-1 text-white bg-red-500 rounded"
         >Create Company</button>
      </div>

      <ui-table :header="headerFields" :content="companies" :loading="isLoading">
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
import CreateForm from '~/components/company/CreateForm.vue'

export default {
   components: { UiTable, CreateForm },

   mixins: [CrudMixin],

   async asyncData({ app }) {
      const { data } = await app.$axios.get('/api/admin/companies')

      return {
         companies: data
      }
   },

   data: () => ({
      headerFields: ['#', 'Name', 'Products count', 'Actions'],
      companies: [],
      crudName: 'company',
   }),

   methods: {

      ...mapActions('companies', {
         destroy: 'destroy',
      }),

      showCreateModal() {
         this.$modal.show(this.modalName, {
            props: {
               company: { name: '' },
               action: 'create'
            }
         })
      },

      handleEdit(item) {
         const { id, name } = item

         this.$modal.show(this.modalName, {
            props: {
               company: { id, name },
               action: 'update'
            }
         })
      }
   }
}
</script>
