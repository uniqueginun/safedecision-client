const urlPrefix = '/api/admin/products';


export const actions = {
   createOrupdateProduct(_, { product, action }) {
      if (action === 'update') {
         return this.$axios.put(`${urlPrefix}/${product.id}`, product);
      }

      return this.$axios.post(urlPrefix, product);
   }
}