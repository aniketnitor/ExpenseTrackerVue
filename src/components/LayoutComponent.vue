<template>
    <div class="flex h-screen">
      <div class="w-64 bg-gray-800 text-white p-5">
        <div class="text-xl font-semibold mb-8">Expense Tracker</div>
        <ul>
          <li>
            <router-link
              to="/dashboard"
              class="block py-2 px-4 rounded-md hover:bg-gray-700"
            >
              Dashboard
            </router-link>
          </li>
          <li>
            <router-link
              to="/expenses"
              class="block py-2 px-4 rounded-md hover:bg-gray-700"
            >
              Expenses
            </router-link>
          </li>
        </ul>
      </div>
  
      <div class="flex-1 bg-gray-100 p-5">
        <router-view></router-view>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "LayoutComponent",
  };
  </script>
  
  <style scoped>
  </style>
  