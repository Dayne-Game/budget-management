const ctx = document.getElementById("myChart");
const icomeExpensePieChart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: ["Income", "Expense", "Remaining"],
    datasets: [
      {
        label: "Income and Expense Chart",
        data: [2800, 1400, 1400],
        backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)", "rgba(255, 206, 86, 0.2)"],
        borderWidth: 3,
      },
    ],
  },
});

const charts = document.getElementById("monthChart");
const monthExpenseChart = new Chart(charts, {
  type: "bar",
  data: {
    labels: ["January", "Feburary", "March", "April"],
    datasets: [
      {
        type: "bar",
        label: "Monthly Spending",
        data: [300, 150, 248, 450],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        type: "line",
        label: "Max Month Spend",
        data: [248, 248, 248, 248],
        fill: false,
        borderColor: "rgb(54, 162, 235)",
      },
    ],
  },
});
