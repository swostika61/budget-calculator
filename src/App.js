import React, { useState, useEffect } from 'react';
import './App.css';
import { Alert } from './components/Alert';
import { ExpenseForm } from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import { v4 as uuid } from 'uuid';

// const initialExpenses = [
//   {
//     id: uuid(),
//     charge: 'rent',
//     amount: 1600
//   },
//   {
//     id: uuid(),
//     charge: 'car',
//     amount: 400
//   },
//   {
//     id: uuid(),
//     charge: 'credit card bill',
//     amount: 1200
//   }
// ]
const initialExpenses = localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) :[]
function App() {
  const [expenses, setExpenses] = useState(initialExpenses)
  // **** CHARGES *****
  const [charge, setCharge] = useState('');
  // **** AMOUNT ******
  const [amount, setAmount] = useState('');
  //***AlERT
  const [alert, setAlert] = useState({ show: false })
  //***EDIT *****
  const [edit, setEdit] = useState(false);
  //****EDITITEM
  const [id, setId] = useState(0);
// ***************USEEFFECT **********
useEffect(()=>{
  console.log("we called wuseEffect");
  localStorage.setItem('expenses', JSON.stringify(expenses));
},[expenses])

// ***************FUNCTIONALITY **********
  const handleCharge = e => {
    setCharge(e.target.value)
  }
  const handleAmount = e => {
    setAmount(e.target.value)
  }
  // ****HANDLE ALERT
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false })
    }, 3000)
  }
  const handleSubmit = e => {
    if (charge !== '' && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map(item=>{
          return item.id === id ? {...item,charge,amount} :item;
        })
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({ type: "success", text: "item edited" })
      } else {
        const singleExpense = { id: uuid(), charge, amount };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: "success", text: "item added" })
      }

      setCharge('');
      setAmount('');
    }

    else {
      handleAlert({ type: "danger", text: "charge can't be empty and amount should be bigger than 0 " })
    }

    e.preventDefault();
  }
  // ****** CLEAR ALL ITEMS *******
  const clearItems = () => {
    setExpenses([]);
    handleAlert({ type: "danger", text: "all items deleted" });
  }

  //******* HANDLE DELETE*********
  const handleDelete = (id) => {
    let tempExpenses = expenses.filter(item => item.id !== id);
    setExpenses(tempExpenses)
    handleAlert({ type: "danger", text: "item deleted" });
  }

  //******* HANDLE EDIT *********
  const handleEdit = (id) => {
    let expense = expenses.find(item => item.id === id)
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  }

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <h1>budget calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete} handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </main>
      <h1>total spending: <span className="total">${expenses.reduce((acc, curr) => {
        return (acc += parseInt(curr.amount))
      }, 0)}</span> </h1>
    </>
  );
}

export default App;
