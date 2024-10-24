import { useEffect, useState, createContext } from "react";
import { Cart } from "@/api";

const cartCtrol = new Cart();

export const CartContext = createContext();

export function CartProvider(props) {
  const { children } = props;
  const [cart, setCart] = useState(null);
  const [total, setTotal] = useState(cartCtrol.count());

  useEffect(() => {
    const response = cartCtrol.getAll();
    setCart(response);
  }, []);

  const addCart = (gameId) => {
    cartCtrol.add(gameId);
    refreshTotalCart();
  };

  const changeQuantityItem = (gameId, quantity) => {
    cartCtrol.changeQuantity(gameId, quantity);
    refreshTotalCart();
  };

  const deleteItem = (gameId) => {
    cartCtrol.delete(gameId);
    refreshTotalCart();
  };

  const deleteAllItems = () => {
    cartCtrol.deleteAll;
    refreshTotalCart();
  };

  const refreshTotalCart = () => {
    setTotal(cartCtrol.count());
    setCart(cartCtrol.getAll());
  };

  const data = {
    cart,
    addCart,
    total,
    deleteItem,
    deleteAllItems,
    changeQuantityItem,
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
}
