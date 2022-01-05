const urlPrefix = '/api/admin/companies';

export const state = () => ({
   companiesList: []
})

export const getters = {
   getCompanies: state => state.companiesList,
}

export const mutations = {
   setCompanies(state, companies) {
      state.companiesList = companies
   },
}

export const actions = {

   async fetchCompanies({ commit }) {
      const companies = await this.$axios.$get(urlPrefix)
      commit('setCompanies', companies)
   },

   destroy(_, id) {
      return this.$axios.delete(`${urlPrefix}/${id}`);
   },

   createOrupdateCompany(_, { company, action }) {
      if (action === 'update') {
         return this.$axios.put(`${urlPrefix}/${company.id}`, company);
      }

      return this.$axios.post(urlPrefix, company);
   }
}
