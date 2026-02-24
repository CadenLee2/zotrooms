"use client"

import "./page.css";

import MainPage from "../components/MainPage/MainPage";

import { store } from "@/store/store";
import { Provider } from "react-redux";

import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<span>Loading...</span>}>
      <Provider store={store}>
        <MainPage />
      </Provider>
    </Suspense>
  );
}
