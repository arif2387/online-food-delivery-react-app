import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
const Cart = styled.button`
  height: 58px;
  background: #60b246;
  color: #fff;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  contain: content;
  pointer-events: auto;
  width: 60%;
  border: none;
  cursor: pointer;
  outline: none;
  text-align: left;
  position: sticky;
  bottom: 1px;
  left: 20%;
  padding: 20px 30px;
`;
const Span1 = styled.div`
  color: white;
  height: 100%;
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 1rem;
  display: block;
`;
const Span2 = styled.div``;
const Span3 = styled.div`
  font-weight: 600;
  font-size: 1rem;
  display: block;
`;
function ItemCart() {
  const cart = useSelector((state) => state.cart);

  let totalCount = 0;
  if (cart != undefined)
    totalCount = cart.items.reduce((sum, item) => sum + item.count, 0);
  return (
    <>
      {cart?.items?.length > 0 ? (
        <Link to="/cart" style={{ textDecoration: "none", color: "inherit" }}>
          <Cart>
            <Span1>{cart.items && cart.items.length} item added</Span1>
            <Span1>View Cart</Span1>
          </Cart>
        </Link>
      ) : (
        <></>
      )}
    </>
  );
}
export default ItemCart;
