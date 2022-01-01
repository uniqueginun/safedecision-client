<template>
   <div class="mt-4">
      <h4 class="text-gray-600">{{ pageTitle }}</h4>

      <div class="mt-6">
         <div class="my-6 overflow-hidden bg-white rounded-md shadow">
            <nuxt-child />
         </div>
      </div>
   </div>
</template>

<script>
export default {
   middleware: ['auth', 'admin'],

   layout: 'auth',

   computed: {
      pageTitle() {
         const routeName = this.$route.name;
         return routeName.replace('-', ' / ');
      }
   },
}
</script>