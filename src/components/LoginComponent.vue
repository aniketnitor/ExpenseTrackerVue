<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
      <h2 class="text-2xl font-semibold text-center mb-6">Login</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <input type="text" v-model="username" id="username"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" v-model="password" id="password"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      error: null,
    };
  },
  methods: {
    login() {
      const userData = { username: this.username, password: this.password };
      this.$store.dispatch('login', userData)
        .then(() => {
          setTimeout(() => {
            this.$router.push({ path: '/dashboard' });
          }, 1000);
        })
        .catch(error => {
          this.error = error;
        });
    },
  },
};
</script>