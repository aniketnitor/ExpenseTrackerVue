<template>
  <form @submit.prevent="handleSubmit" class="space-x-4 mb-5">
    <input v-model="title" type="text" placeholder="Expense Title" class="w-60 p-2 border rounded" />
    <input v-model="amount" type="number" placeholder="Amount" class="w-40 p-2 border rounded" />
    <select v-model="category" class="w-60 p-2 border rounded">
      <option value="Food">Food</option>
      <option value="Transport">Transport</option>  
      <option value="Utilities">Utilities</option>
      <option value="Entertainment">Entertainment</option>
      <option value="Miscellaneous">Miscellaneous</option>
    </select>
    <input v-model="date" type="date" class="w-50 p-2 border rounded" />
    <button type="submit" class="w-40 bg-blue-600 text-white py-2 rounded-md">
      {{ isEditMode ? 'Update Expense' : 'Add Expense' }}
    </button>
    <div v-if="formError" class="mt-5 text-red-600 bg-red-100 border border-red-400 p-3 rounded mb-3 flex justify-between items-center">
      <span>All fields are required.</span>
      <button @click="dismissError" type="button" class="text-red-600 font-bold">X</button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    expenseToEdit: Object,
  },
  data() {
    return {
      title: '',
      amount: '',
      category: 'Food',
      date: new Date().toISOString().split('T')[0],
      formError: false,
    };
  },
  computed: {
    isEditMode() {
      return this.expenseToEdit !== null;
    },
  },
  watch: {
    expenseToEdit(newExpense) {
      if (newExpense) {
        this.title = newExpense.expenseName;
        this.amount = newExpense.amount;
        this.category = newExpense.category;
        this.date = newExpense.date;
      }
    },
  },
  methods: {
    handleSubmit() {
      if (!this.title || !this.amount || !this.category || !this.date) {
        this.formError = true;
        return; 
      }

      this.formError = false;

      const expense = {
        expenseName: this.title,
        amount: this.amount,
        category: this.category,
        date: this.date,
      };

      if (this.isEditMode) {
        this.$store.dispatch('updateExpense', { id: this.expenseToEdit.id, expense })
          .then(() => {
            this.$emit('resetForm'); 
          });
      } else {
        this.$store.dispatch('addExpense', expense);
      }

      this.resetForm();
    },
    resetForm() {
      this.title = '';
      this.amount = '';
      this.category = 'Food';
      this.date = new Date().toISOString().split('T')[0];
    },
    dismissError() {
      this.formError = false; 
    },
  },
};
</script>
