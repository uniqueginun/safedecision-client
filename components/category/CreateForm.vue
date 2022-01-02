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
         <label class="text-xs">Parent</label>

         <div class="relative mt-2 rounded-md shadow-sm">
            <treeselect
               v-model="form.parent_id"
               :options="categories"
               :clearable="true"
               :searchable="true"
               :close-on-select="true"
            />
         </div>
      </div>

      <div class="px-5 pb-3 text-gray-700 bg-gray-200 border-b">
         <label class="text-xs flex items-center">
            Children
            <a href="#" @click.prevent="addChild" class="mx-2">
               <i class="fas fa-plus fa-2x text-green-500"></i>
            </a>
         </label>

         <div v-for="(child, index) of children" :key="index" ref="children">
            <div class="relative mt-2 rounded-md shadow-sm">
               <input
                  type="text"
                  v-model="child.name"
                  @keydown.enter.prevent="addChild"
                  class="w-full px-3 py-2 border-transparent rounded-md appearance-none focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
               />
               <a
                  href="#"
                  @click.prevent="removeChild(index)"
                  class="absolute top-0 right-0 p-2 text-xs text-red-600"
               >
                  <i class="fas fa-2x fa-times"></i>
               </a>
            </div>
         </div>
      </div>

      <div class="flex items-center justify-center py-3">
         <button
            type="button"
            :disabled="loading"
            class="bg-red-600 mx-1 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md"
            @click="$router.push('/admin/categories')"
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

   props: ['category'],

   components: {
      Treeselect,
   },

   data() {
      return {
         form: {},

         action: '',

         children: [],

         loading: false,
      }
   },

   computed: {
      ...mapGetters('categories', {
         categories: 'getCategories',
      }),

      formTitle() {
         return this.isUpdate ? 'Edit Category' : 'Create Category'
      },

      isUpdate() {
         return !!this.category
      },

      successMessage() {
         return this.isUpdate ? 'Category updated successfully' : 'Category created successfully'
      },
   },

   methods: {
      ...mapActions('categories', {
         createCategory: 'createCategory',
         updateCategory: 'updateCategory',
         fetchCategories: 'fetchCategories',
      }),

      resetForm() {
         if (!this.isUpdate) {
            this.form = {
               name: '',
               parent_id: null,
            }
            this.children = [{
               id: null,
               name: null,
            }]
         } else {
            this.form = {
               id: this.category.id,
               slug: this.category.slug,
               name: this.category.label,
               parent_id: this.category.parent_id,
            }

            this.children = this.category.children.map(child => {
               return {
                  id: child.id,
                  name: child.label,
               }
            })
         }
      },

      async handleSubmit() {
         this.loading = true
         try {
            const payload = { ...this.form, children: this.children };
            this.isUpdate ? this.updateCategory(payload) : await this.createCategory(payload);
            await this.$swal('Success', this.successMessage, 'success')
            this.isUpdate && this.$router.push('/admin/categories')
            this.fetchCategories();
            this.resetForm()
         } catch (error) {
            this.$swal('Error', error.message, 'error')
         } finally {
            this.loading = false
         }
      },

      addChild() {

         if (!this.children.length) {
            this.children.push({
               id: null,
               name: '',
            })
            return
         }

         const last = this.children.length - 1;

         if (this.children.length > 0 && this.children[last].name) {
            this.children.push({
               id: null,
               name: '',
            })
         }

         const lastDiv = this.$refs.children[last]
         lastDiv && lastDiv.querySelector('input').focus();
      },

      removeChild(index) {
         this.children.splice(index, 1)
      },
   },

   created() {
      this.fetchCategories();
      this.resetForm()
   }
}
</script>