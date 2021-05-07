import React, { useState } from 'react';
import './App.css';
import { Alert } from './components/Alert';
import { ExpenseForm } from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import { v4 as uuid } from 'uuid';

const initialExpenses = [
  {
    id: uuid(),
    charge: 'rent',
    amount: 1600
  },
  {
    id: uuid(),
    charge: 'car',
    amount: 400
  },
  {
    id: uuid(),
    charge: 'credit card bill',
    amount: 1200
  }
]

function App() {
  const [expenses, setExpenses] = useState(initialExpenses)
  // **** CHARGES *****
  const [charge, setCharge] = useState('');
  // **** AMOUNT ******
  const [amount, setAmount] = useState('');

  const handleCharge=e=>{
    console.log(`charge ${e.target.value}`)
    setCharge(e.target.value)
  }
  const handleAmount=e=>{
    setAmount(e.target.value)
    console.log(`amount ${e.target.value}`)
  }
  const handleSubmit= e =>{
    e.preventDefault();
  }

  return (
    <>
      <Alert />
      <h1>budget calculator</h1>
      <main className="App">
        <ExpenseForm charge={charge} 
        amount={amount} 
        handleCharge={handleCharge} 
        handleAmount={handleAmount} 
        handleSubmit={handleSubmit} />
        <ExpenseList expenses={expenses} />
      </main>
      <h1>total spending: <span className="total">${expenses.reduce((acc,curr)=>{
        return acc +=curr.amount
      },0)}</span> </h1>
    </>
  );
}

export default App;
