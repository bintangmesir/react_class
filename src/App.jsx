import React from "react";
import Home from "./container/Home";
import Detail from "./container/Detail";
import AddForm from "./components/AddForm";
import EditForm from "./components/EditForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddForm />} />
          <Route path="/show/:id" element={<Detail />} />
          <Route path="/edit/:id" element={<EditForm />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
