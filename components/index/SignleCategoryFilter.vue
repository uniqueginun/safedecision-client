<template>
   <div class="flex items-center">
      <div class="flex items-center">
         <input
            id="filter-category-0"
            name="category[]"
            value="new-arrivals"
            type="checkbox"
            class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
         />
         <label for="filter-category-0" class="ml-3 text-sm text-gray-600">{{ category.name }}</label>
         <span class="ml-6 flex items-center">
            <svg
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 20 20"
               fill="currentColor"
               aria-hidden="true"
               class="h-5 w-5"
            >
               <path
                  fill-rule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clip-rule="evenodd"
               />
            </svg>
            <svg
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 20 20"
               fill="currentColor"
               aria-hidden="true"
               class="h-5 w-5"
            >
               <path
                  fill-rule="evenodd"
                  d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                  clip-rule="evenodd"
               />
            </svg>
         </span>
      </div>
   </div>
</template>

<script>

export default {
   props: {
      category: {
         type: Object,
         required: true,
      },
   },
}
</script>