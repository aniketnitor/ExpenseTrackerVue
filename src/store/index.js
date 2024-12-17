import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    user: null,
    expenses: [],
    isAuthenticated: false,
    username: '', // Store the username to make requests for expenses
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.isAuthenticated = true;
      state.username = user.username; // Store username to make expense-related requests
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.username = ''; // Clear username
      state.expenses = []; // Clear expenses
    },
    setExpenses(state, expenses) {
      state.expenses = expenses;
    },
    addExpense(state, expense) {
      state.expenses.unshift(expense); // Add expense at the beginning of the list
    },
    removeExpense(state, expenseId) {
      state.expenses = state.expenses.filter(exp => exp.id !== expenseId);
    },
  },
  actions: {
    // Login action
    login({ commit }, userData) {
      const { username, password } = userData;
      axios.post(`/api/login?username=${username}&password=${password}`)
        .then(response => {
          if (response.data === 'Login successful') {
            commit('setUser', userData); // Commit the user data to Vuex
    
            // Optionally, fetch user expenses after login (if needed)
            // this.dispatch('fetchExpenses', username)
            //   .catch(error => {
            //     console.error('Failed to fetch expenses:', error); // Error handling
            //   });
          } else {
            console.error('Login failed');
          }
        })
        .catch(error => {
          console.error('Login request failed:', error);
        });
    },

    // Logout action
    logout({ commit }) {
      commit('logout'); // Clear user data and reset authentication state
    },

    // Fetch expenses for the logged-in user
    fetchExpenses({ commit, state }) {
      if (!state.username) return; // If no username, return early

      axios.get(`/api/expenses?username=${state.username}`)
        .then(response => {
          commit('setExpenses', response.data); // Commit expenses to Vuex state
        })
        .catch(error => {
          console.error('Failed to fetch expenses:', error);
        });
    },

    // Add an expense for the logged-in user
    addExpense({ commit, state }, expenseData) {
      if (!state.username) return; // Ensure user is logged in

      axios.post(`/api/expenses?username=${state.username}`, expenseData)
        .then(response => {
          commit('addExpense', response.data); // Commit new expense to Vuex
        })
        .catch(error => {
          console.error('Failed to add expense:', error);
        });
    },

    // Delete an expense by its ID
    deleteExpense({ commit, state }, expenseId) {
      if (!state.username) return; // Ensure user is logged in

      axios.delete(`/api/expenses/${expenseId}?username=${state.username}`)
        .then(() => {
          commit('removeExpense', expenseId); // Remove the expense from Vuex state
        })
        .catch(error => {
          console.error('Failed to delete expense:', error);
        });
    },
  },
  getters: {
    getUser: (state) => state.user,
    getExpenses: (state) => state.expenses,
    isAuthenticated: (state) => state.isAuthenticated,
  }
});
