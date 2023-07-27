import Header from "./Components/Layout/Header";
import React from "react";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";
import { useState } from "react";
import CartContextProvider from "./store/cart-contextProvider";

function App() {
  const [isModalVisible, setModalVisible] = useState(false);

  const showModalHandler = () => {
    setModalVisible(true);
  };

  const hideModalHandler = () => {
    setModalVisible(false);
  };

  return (
    <CartContextProvider>
      {isModalVisible && <Cart hide={hideModalHandler} />}
      <Header show={showModalHandler} />
      <main>
        <Meals />
      </main>
    </CartContextProvider>
  );
}

export default App;
