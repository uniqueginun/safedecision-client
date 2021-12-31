<template>
  <div>
    <h1>welcome to home screen</h1>
    <h1>Hi, {{ $auth.user.name }}</h1>
    <h1>{{ $auth.user.email }}</h1>
    <button @click="logout" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Logout</button>
  </div>
</template>

<script>
export default {
  middleware: 'auth',

  methods: {
    async logout() {
      await this.$auth.logout();
    }
  }
}
</script>
