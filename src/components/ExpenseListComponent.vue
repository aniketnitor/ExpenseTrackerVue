<template>
  <div>
    <ExpenseFormComponent></ExpenseFormComponent>
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
          <td class="px-4 py-2">{{ expense.expenseName }}</td>
          <td class="px-4 py-2">{{ expense.amount }}</td>
          <td class="px-4 py-2">{{ expense.category }}</td>
          <td class="px-4 py-2">{{ expense.date }}</td>
          <td class="px-4 py-2 flex space-x-2">
            <button @click="editExpense(expense)" class="text-blue-600 hover:text-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 3l4 4m0 0L9 17l-4 1 1-4L17 3z"></path>
              </svg>
            </button>

            <button @click="deleteExpense(expense.id)" class="text-red-600 hover:text-red-800">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ExpenseFormComponent from './ExpenseFormComponent.vue';

export default {
  components: {
    ExpenseFormComponent
  },
  computed: {
    expenses() {
      return this.$store.getters.getExpenses;
    }
  },
  mounted() {
    this.$store.dispatch('fetchExpenses');
  },
  methods: {
    deleteExpense(id) {
      this.$store.dispatch('deleteExpense', id);
    }
  }
};
</script>
