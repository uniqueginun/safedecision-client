<template>
   <div class="flex h-screen items-center justify-center">
      <form ref="loginform" @submit.prevent="login" class="w-1/4 mx-auto p-4">
         <h1 class="font-semibold mb-4 text-center text-xl">Safe Decision</h1>
         <div class="mb-4">
            <label for="email" class="block mb-1 text-sm">Email</label>
            <input
               type="email"
               v-model="form.email"
               class="w-full border rounded px-3 py-2"
               required
            />
         </div>
         <div class="mb-4">
            <label for="password" class="block mb-1 text-sm">Password</label>
            <input
               type="password"
               v-model="form.password"
               class="w-full border rounded px-3 py-2"
               required
            />
         </div>
         <button
            type="submit"
            class="bg-blue-500 text-white font-semibold py-2 px-10 w-full rounded"
            :class="{ 'opacity-50 cursor-not-allowed': loading || emptyForm }"
            :disabled="loading || emptyForm"
         >{{ loading ? 'Logging in ...' : 'Login' }}</button>
      </form>
   </div>
</template>

<script>

export default {
   middleware: 'auth',

   auth: 'guest',

   data() {
      return {
         form: {
            email: "ubogan@example.net",
            password: "password"
         },
         loading: false,
         error: {}
      }
   },

   methods: {
      async login() {
         this.error = {};

         this.loading = true;

         try {

            await this.$axios.get('/sanctum/csrf-cookie');

            await this.$auth.loginWith('local', {
               data: this.form
            });

            this.$router.push({
               path: '/',
            });
         }

         catch (err) {
            this.error = err;
         }

         finally {
            this.loading = false;
         }
      }
   },
   
   computed: {
      emptyForm() {
         return !this.form.email || !this.form.password;
      }
   }
}
</script>
