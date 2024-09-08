"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../../store";
import Board from "@/app/(root)/kanbanBoard/Board";

const page = () => {
  return (
    <Provider store={store}>
      <Board />
    </Provider>
  );
};

export default page;
