<template>
    <table class="w-full text-left table-auto">
      <thead>
        <tr>
          <th class="px-4 py-2">Title</th>
          <th class="px-4 py-2">Amount</th>
          <th class="px-4 py-2">Category</th>
          <th class="px-4 py-2">Date</th>
          <th class="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="expense in expenses" :key="expense.id">
          <td class="px-4 py-2">{{ expense.title }}</td>
          <td class="px-4 py-2">{{ expense.amount }}</td>
          <td class="px-4 py-2">{{ expense.category }}</td>
          <td class="px-4 py-2">{{ expense.date }}</td>
          <td class="px-4 py-2">
            <button @click="deleteExpense(expense.id)" class="text-red-600">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script>
  export default {
    computed: {
      expenses() {
        return this.$store.getters.getExpenses;
      }
    },
    methods: {
      deleteExpense(id) {
        this.$store.dispatch('deleteExpense', id);
      }
    }
  };
  </script>
  