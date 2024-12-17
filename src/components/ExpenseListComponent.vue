<template>
  <div>
    <ExpenseFormComponent :expenseToEdit="expenseToEdit" @resetForm="resetExpenseToEdit" />

    <div class="flex space-x-4 mb-4">
      <select v-model="filterCategory" class="w-60 p-2 border rounded">
        <option value="">All Categories</option>
        <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
      </select>

      <input v-model="filterKeyword" type="text" class="w-50 p-2 border rounded" placeholder="Search by keyword" />

      <div class="flex space-x-2">
        <input v-model="filterStartDate" type="date" class="w-50 p-2 border rounded" />
        <input v-model="filterEndDate" type="date" class="w-50 p-2 border rounded" />
      </div>

      <button @click="clearFilters" class="w-40 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md">
        Clear Filters
      </button>
    </div>

    <div class="overflow-y-auto h-[460px]">
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
          <tr v-for="expense in filteredExpenses" :key="expense.id">
            <td class="px-4 py-2">{{ expense.expenseName }}</td>
            <td class="px-4 py-2">&#x20B9; {{ expense.amount }}</td>
            <td class="px-4 py-2">{{ expense.category }}</td>
            <td class="px-4 py-2">{{ expense.date }}</td>
            <td class="px-4 py-2 flex space-x-2">
              <button @click="editExpense(expense)" class="text-blue-600 hover:text-blue-800">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17 3l4 4m0 0L9 17l-4 1 1-4L17 3z"></path>
                </svg>
              </button>

              <button @click="deleteExpense(expense.id)" class="text-red-600 hover:text-red-800">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ExpenseFormComponent from './ExpenseFormComponent.vue';

export default {
  components: {
    ExpenseFormComponent,
  },
  data() {
    return {
      filterCategory: '',
      filterKeyword: '',
      filterStartDate: '',
      filterEndDate: '',
      expenseToEdit: null, 
    };
  },
  computed: {
    expenses() {
      return this.$store.getters.getExpenses;
    },
    categories() {
      return [...new Set(this.expenses.map((expense) => expense.category))];
    },
    filteredExpenses() {
      return this.expenses.filter((expense) => {
        const categoryMatch = this.filterCategory === '' || expense.category === this.filterCategory;
        const keywordMatch = expense.expenseName.toLowerCase().includes(this.filterKeyword.toLowerCase());
        const startDateMatch = this.filterStartDate === '' || new Date(expense.date) >= new Date(this.filterStartDate);
        const endDateMatch = this.filterEndDate === '' || new Date(expense.date) <= new Date(this.filterEndDate);

        return categoryMatch && keywordMatch && startDateMatch && endDateMatch;
      });
    },
  },
  mounted() {
    this.$store.dispatch('fetchExpenses');
  },
  methods: {
    deleteExpense(id) {
      this.$store.dispatch('deleteExpense', id);
    },
    clearFilters() {
      this.filterCategory = '';
      this.filterKeyword = '';
      this.filterStartDate = '';
      this.filterEndDate = '';
    },
    resetExpenseToEdit() {
      this.expenseToEdit = null; 
    },
    editExpense(expense) {
      this.expenseToEdit = expense; 
    },
  },
};
</script>
