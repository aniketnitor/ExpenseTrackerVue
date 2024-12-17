<template>
  <div class="flex h-screen">
    <div v-if="isAuthenticated" class="w-64 bg-gray-800 text-white p-5 flex flex-col">
      <div class="text-xl font-semibold mb-8">Expense Tracker</div>
      <ul>
        <li>
          <router-link
            to="/dashboard"
            class="block py-2 px-4 rounded-md hover:bg-gray-700"
            active-class="bg-gray-700"
          >
            Dashboard
          </router-link>
        </li>
        <li>
          <router-link
            to="/expenses"
            class="block py-2 px-4 rounded-md hover:bg-gray-700"
            active-class="bg-gray-700"
          >
            Expenses
          </router-link>
        </li>
      </ul>

      <div class="mt-auto">
        <button 
          @click="logout" 
          class="w-full py-2 mt-5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md">
          Logout
        </button>
      </div>
    </div>

    <div class="flex-1 bg-gray-100 p-5">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "LayoutComponent",
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');  
      this.$router.push({ path: '/' });  
    },
  },
};
</script>

<style scoped>
</style>
