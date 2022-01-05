import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
   data() {
      return {
         selectedItems: []
      }
   },

   watch: {
      selectedItems(value) {

         this.setFilters({
            ...this.filters,
            [this.filterName]: value
         })

         this.fetchProducts()
      },
   },

   computed: {
      ...mapGetters({
         companies: 'companies',
         categories: 'categories',
         filters: 'filters'
      }),
   },

   methods: {
      ...mapActions({
         fetchCompanies: 'fetchCompanies',
         fetchCategories: 'fetchCategories',
         fetchProducts: 'fetchProducts'
      }),

      ...mapMutations({
         setFilters: 'setFilters',
      }),
   },
}