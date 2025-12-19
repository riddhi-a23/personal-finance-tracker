# 💰 Personal Finance Tracker

A sleek, responsive web application designed to help users track their daily expenses with real-time data visualization and persistent storage.

**🌐 [View Live Demo](https://riddhi-a23.github.io/personal-finance-tracker/)**

## ✨ Features

- **Full CRUD Functionality:** Add, view, edit, and delete expense transactions.
- **Dynamic Data Visualization:** Interactive doughnut chart that updates instantly as expenses are modified, powered by **Chart.js**.
- **Local Persistence:** Uses `localStorage` to ensure your financial data remains saved even after closing the browser or refreshing the page.
- **Smart Formatting:** Implements the `Intl.NumberFormat` API to display currency in Indian Rupees (₹) with proper lakh/crore separators.
- **Dark Mode Support:** Includes a custom theme-toggle with CSS variable manipulation for a comfortable viewing experience at night.
- **Mobile Responsive:** Fully optimized for all screen sizes using CSS Media Queries and `scrollIntoView` for a smooth mobile experience.

## 🛠️ Tech Stack

- **HTML5:** Semantic structure for financial data display.
- **CSS3:** Custom properties (variables), Flexbox, and Media Queries for the modern UI.
- **JavaScript (ES6+):** DOM manipulation, Event Listeners, and Array methods (`forEach`, `splice`, `push`).
- **External Library:** [Chart.js](https://www.chartjs.org/) for data rendering.

## 📸 How it Works

1. **Input:** Enter the expense name, amount, and category.
2. **Logic:** The app calculates category-wise totals and updates the global state.
3. **Visualization:** The doughnut chart re-renders to reflect the new spending proportions.
4. **Storage:** The updated array is stringified and saved to your browser's local database.

## 🛠️ How to Run Locally

1. Clone this repository:
   `git clone https://github.com/riddhi-a23/personal-finance-tracker.git`
2. Open `index.html` in any modern web browser.

---
Built with ❤️ by [riddhi-a23](https://github.com/riddhi-a23)
