
export const state = () => ({
   loadingProducts: true,
   loadingCompanies: true,
   loadingCategories: true,
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
   loadingCompanies: state => state.loadingCompanies,
   loadingCategories: state => state.loadingCategories,
   products: state => state.products,
   companies: state => state.companies,
   categories: state => state.categories,
   filters: state => state.filters,
}

export const mutations = {
   setLoadingProducts(state, loading) {
      state.loadingProducts = loading
   },
   setLoadingCompanies(state, loading) {
      state.loadingCompanies = loading
   },
   setLoadingCategories(state, loading) { 
      state.loadingCategories = loading
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

      const products = await this.$axios.$get('/api/productsList', {
         params: getters.filters
      })

      commit('setProducts', products)
      commit('setLoadingProducts', false)
   },

   async fetchCompanies({ commit }) {
      const companies = await this.$axios.$get('/api/companies')
      commit('setCompanies', companies)
      commit('setLoadingCompanies', false)
   },

   async fetchCategories({ commit }) {
      const categories = await this.$axios.$get('/api/categories?simple=true')
      commit('setCategories', categories)
      commit('setLoadingCategories', false)
   },
}

