<template>
   <div class="mt-4">
      <h4 class="text-gray-600">{{ pageTitle }}</h4>

      <div class="mt-6">
         <div class="my-6 bg-white rounded-md shadow">
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
         return this.$route.name.split('.').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ').replace(/\b\w/g, l => l.toUpperCase()).replaceAll('-', ' / ');
      }
   },
}
</script>