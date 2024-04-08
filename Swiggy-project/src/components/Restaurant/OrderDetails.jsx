import React from 'react';
import styled from 'styled-components';

const OrderDetailsContainer = styled.div`
    height: 100%;
    width: 100%;
    backdrop-filter: blur(15px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
`
const OrderContainer = styled.div`
  position: absolute;
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const ItemList = styled.ul`
  list-style: none;
  padding: 0;
`;

const Item = styled.li`
  margin-bottom: 8px;
`;

const TotalPrice = styled.p`
  font-weight: bold;
  margin-top: 10px;
`;

const Status = styled.p`
  font-style: italic;
  margin-top: 10px;
`;

const OrderTime = styled.p`
  font-size: 0.8em;
  color: #666;
`;

const CloseButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
`;

const OrderDetails = ({ onClose }) => {
    const orderData = {
        items: [
            { name: 'Item 1', price: 10 },
            { name: 'Item 2', price: 15 },
        ],
        total: 25,
        status: 'Processing',
        orderTime: new Date().toLocaleString(),
    };

    return (
        <OrderDetailsContainer>
            <OrderContainer>
                <Title>Order Details</Title>
                <ItemList>
                    {orderData.items.map((item, index) => (
                        <Item key={index}>
                            {item.name} - ${item.price}
                        </Item>
                    ))}
                </ItemList>
                <TotalPrice>Total: ${orderData.total}</TotalPrice>
                <Status>Status: {orderData.status}</Status>
                <OrderTime>Order Time: {orderData.orderTime}</OrderTime>
                <CloseButton onClick={onClose}>Close</CloseButton>
            </OrderContainer>
        </OrderDetailsContainer >
    );
};

export default OrderDetails;
