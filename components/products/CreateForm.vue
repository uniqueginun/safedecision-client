<template>
   <form @submit.prevent="handleSubmit">
      <div class="flex items-center justify-between px-5 py-3 text-gray-700 border-b">
         <h3 class="text-sm">{{ formTitle }}</h3>
      </div>

      <div class="px-5 pb-3 text-gray-700 bg-gray-200 border-b">
         <label class="text-xs">Name</label>

         <div class="relative mt-2 rounded-md shadow-sm">
            <input
               type="text"
               v-model="form.name"
               class="w-full px-3 py-2 border-transparent rounded-md appearance-none focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
            />
         </div>
      </div>

      <div class="px-5 pb-3 text-gray-700 bg-gray-200 border-b">
         <label class="text-xs">Category</label>

         <div class="relative mt-2 rounded-md shadow-sm">
            <treeselect
               v-model="form.category_id"
               :options="categories"
               :clearable="true"
               :searchable="true"
               :close-on-select="true"
            />
         </div>
      </div>

      <div class="px-5 pb-3 text-gray-700 bg-gray-200 border-b">
         <label class="text-xs">Company</label>

         <div class="relative mt-2 rounded-md shadow-sm">
            <select
               v-model="form.company_id"
               class="block w-full px-3 py-2 mt-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-40 focus:ring-indigo-500 focus:border-indigo-600">
               <option value="">Select company</option>
               <option v-for="company in companies" :key="company.id" :value="company.id">{{ company.name }}</option>
               </select>
         </div>
      </div>
      
      <div class="px-5 pb-3 text-gray-700 bg-gray-200 border-b">
         <label class="text-xs">Description</label>

         <div class="relative mt-2 rounded-md shadow-sm">
            <textarea
               v-model="form.description"
               class="w-full px-3 py-2 border-transparent rounded-md appearance-none focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
            ></textarea>
         </div>
      </div>


      <div class="px-5 pb-3 text-gray-700 bg-gray-200 border-b">
         <label class="text-xs">Price</label>

         <div class="relative mt-2 rounded-md shadow-sm">
            <input
               type="number"
               v-model="form.price"
               class="w-full px-3 py-2 border-transparent rounded-md appearance-none focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
            />
         </div>
      </div>

      <div class="flex items-center justify-center py-3">
         <button
            type="button"
            :disabled="loading"
            class="bg-red-600 mx-1 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md"
            @click="$router.push('/admin/products')"
         >Back</button>
         <button
            :disabled="loading"
            class="bg-indigo-600 mx-1 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md"
            type="submit"
         >{{ loading ? 'Saving...' : 'Save' }}</button>
      </div>
   </form>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import { mapGetters, mapActions } from 'vuex'

export default {

   props: ['product'],

   components: {
      Treeselect,
   },

   data() {
      return {
         form: {},

         children: [],

         loading: false,
      }
   },

   computed: {
      ...mapGetters('categories', {
         categories: 'getCategories',
      }),

      ...mapGetters('companies', {
         companies: 'getCompanies',
      }),

      formTitle() {
         return this.isUpdate ? 'Edit Product' : 'Create Product'
      },

      isUpdate() {
         return !!this.product
      },

      successMessage() {
         return this.isUpdate ? 'Product updated successfully' : 'Product created successfully'
      },
   },

   methods: {
      ...mapActions('categories', {
         fetchCategories: 'fetchCategories',
      }),

      ...mapActions('companies', {
         fetchCompanies: 'fetchCompanies',
      }),

      ...mapActions('products', {
         createOrupdateProduct: 'createOrupdateProduct',
      }),

      resetForm() {
         if (!this.isUpdate) {
            this.form = {
               name: '',
               category_id: null,
               company_id: '',
               description: '',
               price: 0.00,
            }
         } else {
            this.form = {
               id: this.product.id,
               slug: this.product.slug,
               name: this.product.name,
               category_id: this.product.category_id,
               company_id: this.product.company_id,
               description: this.product.description,
               price: this.product.price,
            }
         }
      },

      async handleSubmit() {
         this.loading = true
         try {
            const payload = {
               product: this.form,
               action: this.isUpdate ? 'update' : 'create',
            }
            await this.createOrupdateProduct(payload);
            await this.$swal('Success', this.successMessage, 'success')
            this.isUpdate && this.$router.push('/admin/companies')
            this.resetForm()
         } catch (error) {
            this.$swal('Error', error.message, 'error')
         } finally {
            this.loading = false
         }
      }
   },

   created() {
      this.fetchCategories();
      this.fetchCompanies();
      this.resetForm()
   }
}
</script>