<template>
    <form @submit.prevent="addExpense" class="space-y-4">
      <input v-model="title" type="text" placeholder="Expense Title" class="w-full p-2 border rounded" />
      <input v-model="amount" type="number" placeholder="Amount" class="w-full p-2 border rounded" />
      <select v-model="category" class="w-full p-2 border rounded">
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Utilities">Utilities</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Miscellaneous">Miscellaneous</option>
      </select>
      <input v-model="date" type="date" class="w-full p-2 border rounded" />
      <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md">Add Expense</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        title: '',
        amount: '',
        category: 'Food',
        date: new Date().toISOString().split('T')[0]
      };
    },
    methods: {
      addExpense() {
        const expense = {
          title: this.title,
          amount: this.amount,
          category: this.category,
          date: this.date
        };
        this.$store.dispatch('addExpense', expense);
        this.resetForm();
      },
      resetForm() {
        this.title = '';
        this.amount = '';
        this.category = 'Food';
        this.date = new Date().toISOString().split('T')[0];
      }
    }
  };
  </script>
  