<template>
   <div class="mt-4">
      <h4 class="text-gray-600">Products</h4>

      <div class="mt-6">
         <div class="my-6 overflow-hidden bg-white rounded-md shadow">
            <table class="w-full text-left border-collapse">
               <thead class="border-b">
                  <tr>
                     <th
                        class="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-indigo-800"
                     >City</th>
                     <th
                        class="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-indigo-800"
                     >Total orders</th>
                  </tr>
               </thead>
               <tbody>
                  <tr class="hover:bg-gray-200">
                     <td class="px-6 py-4 text-lg text-gray-700 border-b">test city</td>
                     <td class="px-6 py-4 text-gray-500 border-b">test address</td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   middleware: 'auth',

   layout: 'auth',
}
</script>
