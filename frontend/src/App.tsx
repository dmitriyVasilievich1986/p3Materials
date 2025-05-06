import * as React from "react";
import { Navbar } from "./components/navbar";
import { ShadowsList, ShadowPage } from "./pages/shadow";
import { Route, Routes } from "react-router";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/shadow">
          <Route index element={<ShadowsList />} />
          <Route path=":shadowId" element={<ShadowPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
