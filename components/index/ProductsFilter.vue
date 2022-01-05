<template>
   <form class="hidden lg:block">
      <h3 class="sr-only">Categories</h3>

      <company-filter />

      <category-filter />

   </form>
</template>

<script>
import CompanyFilter from './filters/CompanyFilter.vue'
import CategoryFilter from './filters/CategoryFilter.vue'

export default {
   components: {
      CompanyFilter,
      CategoryFilter,
   },
}
</script>