<template>
  <div>
    <h1>welcome to home screen</h1>
    <h1>{{ $auth.user }}</h1>
  </div>
</template>

<script>
export default {
  middleware: 'auth'
}
</script>
