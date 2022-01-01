<template>
   <div>
      <ui-table :header="headerFields" :content="content">
         <template slot="action" slot-scope="{ item }">
            <nuxt-link :to="{ name: 'admin.companies.edit', params: { id: item.id } }">Edit</nuxt-link>
            <button size="sm" color="red" @click="handleDelete(item.id)">Delete</button>
         </template>
      </ui-table>
   </div>
</template>

<script>
import UiTable from '~/components/ui/UiTable.vue'

const initialData = [
   {
      firstName: "Macsen",
      lastName: "Schultz",
      hometown: "Rio de Janeiro",
      dob: "01/10/1987",
      created: new Date().getTime(),
      updated: new Date().getTime(),
   },
   {
      firstName: "Sebastian",
      lastName: "Cervantes",
      hometown: "Brisbane",
      dob: "13/11/1994",
      created: new Date().getTime(),
      updated: new Date().getTime(),
   },
   {
      firstName: "Tayyab",
      lastName: "Lister",
      hometown: "Perth",
      dob: "14/12/1997",
      created: new Date().getTime(),
      updated: new Date().getTime(),
   },
   {
      firstName: "Anum",
      lastName: "Warren",
      hometown: "Manaus",
      dob: "17/02/1951",
      created: new Date().getTime(),
      updated: new Date().getTime(),
   },
   {
      firstName: "Areeba",
      lastName: "Stein",
      hometown: "Rome",
      dob: "18/03/1954",
      created: new Date().getTime(),
      updated: new Date().getTime(),
   },
   {
      firstName: "Elvis",
      lastName: "Ray",
      hometown: "Lisbon",
      dob: "08/11/1980",
      created: new Date().getTime(),
      updated: new Date().getTime(),
   }
]

export default {
   components: { UiTable },
   data: () => ({
      headerFields: [
         {
            name: "firstName",
            label: "First Name",
         },
         {
            name: "lastName",
            label: "Last Name",
         },
         {
            name: "hometown",
            label: "Hometown",
         },
         {
            name: "dob",
            label: "Data of Birght",
         },
         {
            name: "created",
            label: "Created",

         },
         {
            name: "updated",
            label: "Updated",
         },
         {
            name: "actions",
            label: "Actions",
         },
      ],
      content: initialData,
   })
}
</script>
