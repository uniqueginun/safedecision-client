export default {
   data() {
      return {
         isLoading: false,
         crudItem: null
      }
   },

   computed: {
      modalName() {
         return `${this.crudName}-modal`
      }
   },

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
                  await this.destroy(id)
                  await this.$swal(
                     'Deleted!',
                     `${this.crudName} has been deleted.`,
                     'success'
                  )
                  this.$nuxt.refresh()
               } catch (error) {
                  await this.$swal(
                     'Error!',
                     `${this.crudName} was not deleted successfully!`,
                     'error'
                  )
               }
            }
         })
      },

      actionPerformed() {
         this.$modal.hide(this.modalName)
         this.$nuxt.refresh()
      },

      closeModal() {
         this.$modal.hide(this.modalName)
      },

      beforeOpen(event) {
         this.crudItem = event.params.props
      },
   }
}