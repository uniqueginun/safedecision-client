const urlPrefix = '/api/admin/companies';

export const actions = {
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
