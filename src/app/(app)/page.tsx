"use client";

import { Suspense } from "react";
import MainPage from "./components/MainPage";

const Home = () => {
  return (
    <Suspense>
      <MainPage />
    </Suspense>
  );
};

export default Home;
