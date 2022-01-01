<template>
   <div>
      <global-modal
         name="company-form-modal"
         @before-open="beforeOpen"
         @closed="companyAction = null"
      >
         <CreateForm v-if="companyAction" :company="companyAction" @cancel="closeModal" @updated="actionPerformed" />
      </global-modal>

      <div class="m-4">
         <button @click="showCreateModal" class="px-2 py-1 text-white bg-red-500 rounded">Create Company</button>
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
import UiTable from '~/components/ui/UiTable.vue'
import CreateForm from '~/components/company/CreateForm.vue'

export default {
   components: { UiTable, CreateForm },

   async asyncData({ app }) {
      const { data } = await app.$axios.get('/api/admin/companies')

      return {
         companies: data
      }
   },

   data: () => ({
      headerFields: ['#', 'Name', 'Products count', 'Actions'],

      isLoading: false,

      companies: [],

      companyAction: null
   }),

   methods: {
      handleDelete(id) {
         this.$swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
         }).then(async (result) => {
            if (result.isConfirmed) {
               try {
                  await this.$store.dispatch('companies/destroy', id)
                  await this.$swal(
                     'Deleted!',
                     'Company has been deleted.',
                     'success'
                  )
                  this.$nuxt.refresh()
               } catch (error) {
                  await this.$swal(
                     'Error!',
                     'Company was not deleted successfully!',
                     'error'
                  )
               }
            }
         })
      },

      showCreateModal() {
         this.$modal.show('company-form-modal', {
            props: {
               company: { name: '' },
               action: 'create'
            }
         })
      },

      handleEdit(item) {
         const { id, name } = item

         this.$modal.show('company-form-modal', {
            props: {
               company: { id, name },
               action: 'update'
            }
         })
      },

      actionPerformed() {
         this.$modal.hide('company-form-modal')
         this.$nuxt.refresh()
      },

      closeModal() {
         this.$modal.hide('company-form-modal')
      },

      beforeOpen(event) {
         this.companyAction = event.params.props
      },
   }
}
</script>
