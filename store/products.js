const urlPrefix = '/api/admin/products';


export const actions = {
   createOrupdateProduct(_, { product, action }) {
      if (action === 'update') {
         return this.$axios.put(`${urlPrefix}/${product.slug}`, product);
      }

      return this.$axios.post(urlPrefix, product);
   },

   destroy(_, id) {
      return this.$axios.delete(`${urlPrefix}/${id}`);
   }
}