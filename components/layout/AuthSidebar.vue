<template>
   <div class="flex">
      <!-- Backdrop -->
      <div
         :class="isOpen ? 'block' : 'hidden'"
         @click="isOpen = false"
         class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"
      ></div>
      <!-- End Backdrop -->

      <div
         :class="isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
         class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0"
      >
         <div class="flex items-center justify-center mt-8">
            <div class="flex items-center">
               <span class="mx-2 text-2xl font-semibold text-white">Safe Decision</span>
            </div>
         </div>

         <nav class="mt-10">
            <router-link
               v-for="(link, index) of links"
               :key="index"
               class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
               :class="[$route.name === `admin-${link}` ? activeClass : inactiveClass]"
               :to="`/admin/${link}`"
            >
               <span class="mx-4">{{ upperCaseFirst(link) }}</span>
            </router-link>
         </nav>
      </div>
   </div>
</template>

<script>
export default {
   name: 'Sidebar',

   data: () => ({
      isOpen: false,
      activeClass: 'bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100',
      inactiveClass: 'border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100',
      links: ['companies','categories','products']
   }),

   methods: {
      toggle() {
         this.isOpen = !this.isOpen
      },

      upperCaseFirst(string) {
         return string.charAt(0).toUpperCase() + string.slice(1)
      },

      logout() {
         this.$store.dispatch('logout')
      }
   }
}
</script>
