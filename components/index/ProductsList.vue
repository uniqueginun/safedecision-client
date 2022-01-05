<template>
   <div class="lg:col-span-3">
      <div class="border-4 border-dashed border-gray-200 rounded-lg h-96 lg:h-full">
         <div class="bg-white">
            <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
               <div
                  class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
               >
                  <template v-if="loading">
                     <div
                        v-for="x in fakeProducts"
                        :key="`random-int-${x}`"
                        class="border border-gray-300 shadow rounded-md p-4 max-w-sm w-full mx-auto"
                     >
                        <div class="animate-pulse flex space-x-4">
                           <div class="rounded-full bg-gray-200 h-10 w-10"></div>
                           <div class="flex-1 space-y-6 py-1">
                              <div class="h-2 bg-gray-200 rounded"></div>
                              <div class="space-y-3">
                                 <div class="grid grid-cols-3 gap-4">
                                    <div class="h-2 bg-gray-200 rounded col-span-2"></div>
                                    <div class="h-2 bg-gray-200 rounded col-span-1"></div>
                                 </div>
                                 <div class="h-2 bg-gray-200 rounded"></div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </template>

                  <template v-else-if="products.length">
                     <product v-for="product of products" :product="product" :key="product.id" />
                  </template>

                  <div v-else>لا توجد منتجات حاليا</div>

                  <!-- More products... -->
               </div>
            </div>
         </div>
      </div>
      <!-- /End replace -->
   </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import Product from './Product.vue';

export default {

   components: { Product },

   computed: {
      ...mapGetters({
         products: 'products',
         loading: 'loadingProducts'
      }),

      fakeProducts() {
         return Array.from({ length: 12 }).map((_, i) => i);
      }
   },

   methods: {
      ...mapActions({
         fetchProducts: 'fetchProducts',
      }),
   },

   created() {
      this.fetchProducts();
   },
}
</script>