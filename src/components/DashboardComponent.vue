<template>
  <div class="bg-white p-6 rounded shadow-md">
    <h2 class="text-2xl font-semibold">Dashboard</h2>
    
    <div class="mt-6 p-4 bg-gray-100 rounded shadow-md">
      <h3 class="text-xl font-semibold">Total Expenses for this Month</h3>
      <p class="text-3xl font-bold">{{ totalExpenses }}</p>
    </div>

    <div class="flex space-x-12 mt-6">
      
      <div class="flex-1 p-4 bg-gray-100 rounded shadow-md">
        <h3 class="text-xl font-semibold mb-4">Expenses Breakdown by Category</h3>
        <canvas id="expensePieChart" class="w-full pie"></canvas>
      </div>

      <div class="flex-1 p-4 bg-gray-100 rounded shadow-md">
        <h3 class="text-xl font-semibold mb-4">Weekly Expenses</h3>
        <canvas id="weeklyExpensesChart" class="w-full bar"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import Chart from 'chart.js/auto';
import { useStore } from 'vuex';

export default {
  name: "DashboardComponent",
  setup() {
    const store = useStore();
    const totalExpenses = ref(0);
    const categoryData = ref({});
    const weeklyExpenses = ref({});

    const expenses = computed(() => {
      return store.getters.getExpenses;
    });

    const calculateExpenses = () => {
      let total = 0;
      let categories = {};

      expenses.value.forEach(expense => {
        total += expense.amount;

        if (categories[expense.category]) {
          categories[expense.category] += expense.amount;
        } else {
          categories[expense.category] = expense.amount;
        }
      });

      totalExpenses.value = total;
      categoryData.value = categories;
    };

    const calculateWeeklyExpenses = () => {
      let weeklyExpensesData = {
        Monday: 0,
        Tuesday: 0,
        Wednesday: 0,
        Thursday: 0,
        Friday: 0,
        Saturday: 0,
        Sunday: 0
      };

      expenses.value.forEach(expense => {
        const date = new Date(expense.date);
        const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });

        weeklyExpensesData[dayOfWeek] += expense.amount;
      });

      weeklyExpenses.value = weeklyExpensesData;
    };

    const createPieChart = () => {
      const ctx = document.getElementById('expensePieChart').getContext('2d');
      const chartData = {
        labels: Object.keys(categoryData.value),
        datasets: [{
          label: 'Expense Breakdown',
          data: Object.values(categoryData.value),
          backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33A6'], // Customize colors
        }]
      };

      new Chart(ctx, {
        type: 'pie',
        data: chartData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function(tooltipItem) {
                  return tooltipItem.label + ': ' + tooltipItem.raw.toLocaleString();
                }
              }
            }
          }
        }
      });
    };

    const createBarChart = () => {
      const ctx = document.getElementById('weeklyExpensesChart').getContext('2d');
      const chartData = {
        labels: Object.keys(weeklyExpenses.value),
        datasets: [{
          label: 'Weekly Expenses',
          data: Object.values(weeklyExpenses.value),
          backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33A6'], // Customize colors
        }]
      };

      new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function(tooltipItem) {
                  return tooltipItem.label + ': ' + tooltipItem.raw.toLocaleString();
                }
              }
            }
          }
        }
      });
    };

    onMounted(() => {
      store.dispatch('fetchExpenses').then(() => {
        calculateExpenses();
        calculateWeeklyExpenses();
        createPieChart();
        createBarChart();
      });
    });

    return {
      totalExpenses
    };
  }
};
</script>

<style scoped>
.pie {
  height: 300px !important;
  margin-left: 60px;
  width: 300px !important;
}

.bar {
  margin-top: 40px;
}

.chart-container {
  margin-top: -20px; 
}
</style>
