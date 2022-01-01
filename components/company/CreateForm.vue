<template>
   <div class="mt-4">
      <form @submit.prevent="handleSubmit">
         <div class="flex items-center justify-between px-5 py-3 text-gray-700 border-b">
            <h3 class="text-sm">{{ action }} company</h3>
         </div>

         <div class="px-5 py-6 text-gray-700 bg-gray-200 border-b">
            <label class="text-xs">Name</label>

            <div class="relative mt-2 rounded-md shadow-sm">
               <input
                  type="text"
                  v-model="form.name"
                  class="w-full px-3 py-2 border-transparent rounded-md appearance-none focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
               />
            </div>
         </div>

         <div class="flex items-center justify-center py-3">
            <button
               type="button"
               class="bg-red-600 mx-1 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md"
               @click="$emit('cancel')"
            >Cancel</button>
            <button
               class="bg-indigo-600 mx-1 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md"
               type="submit"
            >Save</button>
         </div>
      </form>
   </div>
</template>

<script>

import { mapActions } from 'vuex';

export default {
   props: ['company'],

   data() {
      return {
         form: {},
         action: ''
      };
   },

   methods: {
      ...mapActions('companies', ['createOrupdateCompany']),

      handleSubmit() {
         this.createOrupdateCompany({
            company: this.form,
            action: this.action
         }).then(async () => {
            await this.$swal(
               'Success',
               `Company ${this.action}d successfully`,
               'success'
            )
            this.$emit('updated');
         });
      }
   },

   created() {
      this.form = this.company.company || { 'name': '' };
      this.action = this.company.action
   },
}
</script>