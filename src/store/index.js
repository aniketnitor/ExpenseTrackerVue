import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    user: null,
    expenses: [],
    isAuthenticated: false,
    username: '', 
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.isAuthenticated = true;
      state.username = user.username; 
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.username = ''; 
      state.expenses = []; 
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
    updateExpense(state, updatedExpense) {
      const index = state.expenses.findIndex(exp => exp.id === updatedExpense.id);
      if (index !== -1) {
        state.expenses.splice(index, 1, updatedExpense); 
      }
    }
  },
  actions: {
    login({ commit }, userData) {
      const { username, password } = userData;
      axios.post(`/api/login?username=${username}&password=${password}`)
        .then(response => {
          if (response.data === 'Login successful') {
            commit('setUser', userData); 
          } else {
            console.error('Login failed');
          }
        })
        .catch(error => {
          console.error('Login request failed:', error);
        });
    },

    logout({ commit }) {
      commit('logout'); 
    },

    fetchExpenses({ commit, state }) {
      if (!state.username) return; 

      axios.get(`/api/expenses?username=${state.username}`)
        .then(response => {
          commit('setExpenses', response.data);
        })
        .catch(error => {
          console.error('Failed to fetch expenses:', error);
        });
    },

    addExpense({ commit, state }, expenseData) {
      if (!state.username) return; 

      axios.post(`/api/expenses?username=${state.username}`, expenseData)
        .then(response => {
          commit('addExpense', response.data); 
        })
        .catch(error => {
          console.error('Failed to add expense:', error);
        });
    },

    updateExpense({ commit, state }, { id, expense }) {
      if (!state.username) return; 
  
      axios.put(`/api/expenses/${id}?username=${state.username}`, expense)
        .then(response => {
          commit('updateExpense', response.data); 
        })
        .catch(error => {
          console.error('Failed to update expense:', error);
        });
    },
  

    deleteExpense({ commit, state }, expenseId) {
      if (!state.username) return; 

      axios.delete(`/api/expenses/${expenseId}?username=${state.username}`)
        .then(() => {
          commit('removeExpense', expenseId); 
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
