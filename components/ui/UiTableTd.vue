<template>
   <th v-if="isTh" class="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-indigo-800">
      <slot />
   </th>
   <td v-else class="px-6 py-4 text-gray-500 border-b">
      <slot />
   </td>
</template>

<script>
export default {
   props: {
      type: {
         type: String,
         default: 'td',
      },
   },

   computed: {
      isTh() {
         return this.type === 'th';
      },
   },
}
</script>