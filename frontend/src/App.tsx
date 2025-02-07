import React from "react";
import Book from "./components/index.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Book />
      <ToastContainer />
    </React.Fragment>
  );
};

export default App;
