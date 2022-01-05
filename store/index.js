
export const state = () => ({
   loadingProducts: true,
   products: [],
   companies: [],
   categories: [],
   filters: {
      company: [],
      category: [],
      price: [],
   }
})

export const getters = {
   loadingProducts: state => state.loadingProducts,
   products: state => state.products,
   companies: state => state.companies,
   categories: state => state.categories,
   filters: state => state.filters,
}

export const mutations = {
   setLoadingProducts(state, loading) {
      state.loadingProducts = loading
   },
   setProducts(state, products) {
      state.products = products
   },
   setCompanies(state, companies) {
      state.companies = companies
   },
   setCategories(state, categories) {
      state.categories = categories
   },
   setFilters(state, filters) {
      state.filters = filters
   }
}

export const actions = {
   async fetchProducts({ commit, getters }) {
      commit('setLoadingProducts', true)

      const products = await this.$axios.$get('/api/admin/productsList', {
         params: getters.filters
      })

      commit('setProducts', products)
      commit('setLoadingProducts', false)
   },

   async fetchCompanies({ commit }) {
      const companies = await this.$axios.$get('/api/admin/companies')
      commit('setCompanies', companies)
   },

   async fetchCategories({ commit }) {
      const categories = await this.$axios.$get('/api/admin/categories?simple=true')
      commit('setCategories', categories)
   },
}

