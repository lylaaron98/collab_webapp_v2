"use client";
import React from "react";
import { Header } from "./Expensecomponents/Header";
import { Balance } from "./Expensecomponents/Balance";
import { IncomeExpenses } from "./Expensecomponents/IncomeExpenses";
import { TransactionList } from "./Expensecomponents/TransactionList";
import { AddTransaction } from "./Expensecomponents/AddTransaction";

import { GlobalProvider } from "./context/GlobalState";

import "./ExpenseTracker.css";

function ExpenseTracker() {
  return (
    <GlobalProvider>
      <div className="mx-auto w-[350px] my-10 border p-4">
        <Balance />
        <IncomeExpenses />
        <TransactionList />
        <AddTransaction />
      </div>
    </GlobalProvider>
  );
}

export default ExpenseTracker;
