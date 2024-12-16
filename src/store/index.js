import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    user: null,
    expenses: [],
    isAuthenticated: false,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.isAuthenticated = true;
    },
    setExpenses(state, expenses) {
      state.expenses = expenses;
    },
    addExpense(state, expense) {
      state.expenses.unshift(expense); 
    },
    removeExpense(state, expenseId) {
      state.expenses = state.expenses.filter(exp => exp.id !== expenseId);
    },
  },
  actions: {
    login({ commit }, userData) {
      axios.post('/api/login', userData)
        .then(response => {
          if (response.data === 'Login successful') {
            axios.get('/api/user')
              .then(response => {
                commit('setUser', response.data);
              });
          } else {
            console.error('Login failed');
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    fetchExpenses({ commit }) {
      axios.get('/api/expenses')
        .then(response => {
          commit('setExpenses', response.data);
        });
    },
    addExpense({ commit }, expenseData) {
      axios.post('/api/expenses', expenseData)
        .then(response => {
          commit('addExpense', response.data);
        });
    },
    deleteExpense({ commit }, expenseId) {
      axios.delete(`/api/expenses/${expenseId}`)
        .then(() => {
          commit('removeExpense', expenseId);
        });
    },
  },
  getters: {
    getUser: (state) => state.user,
    getExpenses: (state) => state.expenses,
    isAuthenticated: (state) => state.isAuthenticated,
  }
});
