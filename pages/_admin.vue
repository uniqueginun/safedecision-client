<template>
   <nuxt-child />
</template>

<script>
export default {
   middleware: ['auth', 'admin'],

   layout: 'auth',
}
</script>