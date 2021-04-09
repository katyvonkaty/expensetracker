import logo from "./logo.svg";
import "./App.css";
const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");

const money_minus = document.getElementById("money-minus");

const list = document.getElementById("list");

const form = document.getElementById("form");

const text = document.getElementById("text");

const amount = document.getElementById("amount");

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
localStorage.getItem("transactions") !== null ? localStorageTransactions : [];
//add transactions to dom list

//add dummyTransaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("please add a text");
  } else {
    const transaction = {
      id: generateId(),
      text: text.value,
      amount: +amount.value,
    };

    transactions.push(transaction);
    addTransactionDom(transaction);
    updateValues();
    updateLocalStorage();

    text.value = "";
    amount.value = "";
  }
}

function generateId() {
  return Math.floor(Math.random() * 1000000);
}

function addTransactionDom(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");

  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
      ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn" onClick="removeTransaction(${
    transaction.id
  })">x</button>
    `;

  list.appendChild(item);
}

//generate idea


//update balance income and Expense
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  console.log(total);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense =
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0 *
    -1).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;

  console.log(income);
}
//remove transaction
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);

  updateLocalStorage();

  init();
}

//update local storage transactions

function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}



//init app
function init() {
  list.innerHTML = "";

  console.log(transactions);
  if (!transactions) {
    return null;
  } else {
    transactions.forEach(addTransactionDom);
  }

  updateValues();
}

init();

form.addEventListener("submit", addTransaction);

function App() {
  return <div className="App"></div>;
}

export default App;
