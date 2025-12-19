const form = document.getElementById('finance-form');
const expenseList = document.getElementById('expense-list');
const totalAmountText = document.getElementById('total-amount');
const themeToggle = document.getElementById('theme-toggle');
const submitBtn = document.getElementById('submit-btn'); 
const clearBtn = document.getElementById('clear-all');
const ctx = document.getElementById('expenseChart').getContext('2d');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let myChart;
let editIndex = -1;

// --- Theme Toggle ---
themeToggle.addEventListener('click', () => {
    const doc = document.documentElement;
    const isDark = doc.getAttribute('data-theme') === 'dark';
    doc.setAttribute('data-theme', isDark ? 'light' : 'dark');
    themeToggle.innerText = isDark ? '🌙' : '☀️';
    updateDashboard(); 
});

const indianFormat = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 });

function updateDashboard() {
    expenseList.innerHTML = '';
    let total = 0;
    const totals = { Food: 0, Rent: 0, Transport: 0, Entertainment: 0, Miscellaneous: 0 };

    expenses.forEach((item, index) => {
        total += parseFloat(item.amount);
        totals[item.category] = (totals[item.category] || 0) + parseFloat(item.amount);
        
        const li = document.createElement('li');
        li.innerHTML = `
            <div style="flex: 1;">
                <span class="category-tag" style="color: var(--primary)">${item.category}</span><br>
                <strong>${item.name}</strong>
                ${item.note ? `<br><small style="font-style: italic; opacity: 0.8;">"${item.note}"</small>` : ''}
            </div>
            <div style="text-align: right;">
                <div style="font-weight: 800; font-size: 1.1rem;">₹${item.amount}</div>
                <div class="action-btns">
                    <button class="edit-btn" onclick="editExpense(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteExpense(${index})">Delete</button>
                </div>
            </div>
        `;
        expenseList.appendChild(li);
    });

    totalAmountText.innerText = indianFormat.format(total);
    updateChart(totals);
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function updateChart(dataValues) {
    if (myChart) myChart.destroy();
    const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text').trim();

    myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(dataValues),
            datasets: [{
                data: Object.values(dataValues),
                backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'],
                borderWidth: 2,
                borderColor: getComputedStyle(document.documentElement).getPropertyValue('--card').trim()
            }]
        },
        options: { 
            plugins: { 
                legend: { 
                    display: true, 
                    position: 'top',
                    labels: { color: textColor, font: { family: 'Inter', size: 11 }, padding: 10 }
                } 
            },
            cutout: '65%',
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const expenseData = {
        name: document.getElementById('name').value,
        amount: document.getElementById('amount').value,    
        category: document.getElementById('category').value,
        note: document.getElementById('note').value
    };

    if (editIndex === -1) {
        expenses.push(expenseData);
    } else {
        expenses[editIndex] = expenseData;
        editIndex = -1; 
        submitBtn.innerText = "Add Expense";
        submitBtn.style.background = "var(--primary)";
    }

    form.reset();
    updateDashboard();
});

function deleteExpense(index) {
    if(confirm("Delete this transaction?")) {
        expenses.splice(index, 1);
        updateDashboard();
    }
}

function editExpense(index) {
    const item = expenses[index];
    document.getElementById('name').value = item.name;
    document.getElementById('amount').value = item.amount;
    document.getElementById('category').value = item.category;
    document.getElementById('note').value = item.note || '';
    
    editIndex = index;
    submitBtn.innerText = "Update Expense";
    submitBtn.style.background = "#22c55e"; 
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

clearBtn.addEventListener('click', () => {
    if (confirm("Delete ALL transactions? This cannot be undone.")) {
        expenses = [];
        localStorage.removeItem('expenses');
        updateDashboard();
    }
});

updateDashboard();