const categoriesUrlPrefix = '/api/admin/categories';

export const state = () => ({
   categories: []
})

export const mutations = {
   setCategories(state, categories) {
      state.categories = categories
   },
}

export const actions = {
   async fetchCategories({ commit }) {
      const categories = await this.$axios.$get(`${categoriesUrlPrefix}?simple=true`)
      commit('setCategories', categories)
   },

   createCategory(_, category) {
      return this.$axios.$post(`${categoriesUrlPrefix}`, category)
   },

   updateCategory(_, category) {
      return this.$axios.$put(`${categoriesUrlPrefix}/${category.slug}`, category)
   }
}

export const getters = {
   getCategories: state => state.categories,
}