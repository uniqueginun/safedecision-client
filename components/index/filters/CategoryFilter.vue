<template>
   <div class="border-b border-gray-200 py-6">
      <h3 class="-my-3 flow-root">
         <!-- Expand/collapse section button -->
         <button
            type="button"
            class="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500"
            aria-controls="filter-section-1"
            aria-expanded="false"
         >
            <span class="font-medium text-gray-900">Categories</span>
         </button>
      </h3>

      <div class="pt-6" id="filter-section-1" v-if="! loadingCategories">
         <div class="space-y-4" v-if="false">
            <signle-category-filter
               v-for="cat of categories"
               :key="`cat-${cat.id}`"
               :category="cat"
            />
         </div>
         <div class="space-y-4">
            <treeselect
               :options="categories"
               v-model="selectedItems"
               :clearable="true"
               :searchable="true"
               :default-expand-level="1"
               :alwaysOpen="true"
               openDirection="below"
            >
               <label slot="option-label" slot-scope="{ node, labelClassName }" :class="labelClassName">
                  {{ node.label }}
                  <span v-if="node.products_count" >({{ node.products_count }})</span>
               </label>
            </treeselect>
         </div>
      </div>
      <div class="pt-6" id="filter-section-1" v-else>Loading...</div>
   </div>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import SignleCategoryFilter from '../SignleCategoryFilter.vue'
import FilterMixin from '~/mixins/FilterMixin'

export default {
   components: { SignleCategoryFilter, Treeselect },
   
   mixins: [FilterMixin],

   data() {
      return {
         filterName: 'category',
      }
   },

   created() {
      this.fetchCategories()
   },
}
</script>