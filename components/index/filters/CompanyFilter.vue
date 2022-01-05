<template>
   <div class="border-b border-gray-200 py-6">
      <h3 class="-my-3 flow-root">
         <!-- Expand/collapse section button -->
         <button
            type="button"
            class="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500"
            aria-controls="filter-section-0"
            aria-expanded="false"
         >
            <span class="font-medium text-gray-900">Companies</span>
         </button>
      </h3>
      <div class="pt-6" id="filter-section-0">
         <div class="space-y-4">
            <div class="flex items-center" v-for="{id, name, products_count} of companies" :key="id">
               <input
                  :id="`filter-company-${id}`"
                  :value="id"
                  type="checkbox"
                  class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                  v-model="selectedItems"
               />
               <label :for="`filter-company-${id}`" class="ml-3 text-sm text-gray-600">{{ name }} [{{ products_count }}]</label>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import FilterMixin from '~/mixins/FilterMixin'

export default {
   mixins: [FilterMixin],

   data () {
      return {
         filterName: 'company',
      }
   },

   created() {
      this.fetchCompanies()
   },
}
</script>