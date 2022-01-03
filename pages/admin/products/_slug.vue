<template>
   <div class="mt-4">
      <edit-product-form :product="product"></edit-product-form>
   </div>
</template>

<script>
import EditProductForm from '~/components/products/CreateForm.vue'

export default {
   components: { EditProductForm },

   computed: {
      slug() {
         return this.$route.params.slug;
      },
   },

   data() {
      return {
         product: null,
      };
   },

   async asyncData({ params, app }) {
      try {
         const { data } = await app.$axios.get(`/api/admin/products/${params.slug}`);
         return { product: data }
      } catch (error) {
         app.$swal('Error', error.message, 'error')
      }
   }
}
</script>