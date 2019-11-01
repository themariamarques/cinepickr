import React from "react";
import Header from "./components/Header";
import FilmsContainer from "./components/FilmsContainer";
import { FilmsProvider } from "./context/Films";
import "./App.css";

function App() {
  return (
    <FilmsProvider>
      <Header />
      <FilmsContainer />
    </FilmsProvider>
  );
}

export default App;
