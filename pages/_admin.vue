<template>
   <nuxt-child />
</template>

<script>
export default {
   middleware: ['auth', 'admin'],
}
</script>