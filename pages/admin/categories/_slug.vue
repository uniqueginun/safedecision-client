<template>
   <div class="mt-4">
      <edit-category-form :category="category"></edit-category-form>
   </div>
</template>

<script>
import EditCategoryForm from '~/components/category/CreateForm.vue'

export default {
   components: { EditCategoryForm },

   computed: {
      slug() {
         return this.$route.params.slug;
      },
   },

   data() {
      return {
         category: null,
      };
   },

   async asyncData({ params, app }) {
      try {
         const { data } = await app.$axios.get(`/api/admin/categories/${params.slug}/edit`);
         return { category: data }
      } catch (error) {
         app.$swal('Error', error.message, 'error')
      }
   }
}
</script>