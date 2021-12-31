<template>
  <div class="flex h-screen bg-gray-200 font-roboto">
    <AuthSidebar />

    <div class="flex-1 flex flex-col overflow-hidden">
      <AuthHeaderVue />

      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div class="container mx-auto px-6 py-8">
          <Nuxt />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import AuthHeaderVue from "~/components/layout/AuthHeader.vue"
import AuthSidebar from "~/components/layout/AuthSidebar.vue"

export default {
   components: {
      AuthHeaderVue,
      AuthSidebar
   }
}
</script>