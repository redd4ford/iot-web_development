import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Content from "../Content/Content";
import "../App/App.css"

function App() {

  return (
    <div>
      <Header />
      <div className="app">
        <Content />
        <Footer />
      </div>

    </div>
  );
}

export default App;
