import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Pagination from '@mui/material/Pagination';
import { Stack, Button } from '@mui/material';
import AllOrders from './order.json';
import { useDispatch, useSelector } from 'react-redux';
import OrderDetails from './OrderDetails';
import {
  setOrders,
  setSelectedOrderId,
  setCurrentPage,
} from '../../feature/restaurant/RestaurantHomeSlice';

const OrdersContainer = styled.div`
  max-width: 60%;
  margin: 2rem auto;
`;

const OrdersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.th`
  padding: 12px;
  font-size: 1.5rem;
  background-color: #f2f2f2;
`;

const TableRow = styled.tr`
  text-align: center;
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  font-size: 1.5rem;
`;

const Select = styled.select`
  padding: 8px;
  font-size: 1rem;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const OrdersComponent = () => {
  const dispatch = useDispatch();
  const [isOpenDetails, setOpenDetails] = useState(false);

  const { orders, selectedStatus, selectedOrderId, currentPage, pageSize } = useSelector((state) => state.Orders);

  useEffect(() => {
    dispatch(setOrders(AllOrders));
  }, []);

  const totalPages = Math.ceil(orders.length / pageSize);

  const handlePageChange = (event, newPage) => {
    dispatch(setCurrentPage(newPage));
    dispatch(setSelectedOrderId(null));
  };

  const handleView = () => {
    setOpenDetails(!isOpenDetails)
  }

  const startIndex = (currentPage - 1) * pageSize;
  const visibleOrders = orders.slice(startIndex, startIndex + pageSize);

  return (
    <>
    {isOpenDetails && <OrderDetails onClose={handleView}/>}
      <OrdersContainer>
        <OrdersTable>
          <thead>
            <tr>
              <TableHeader>Order ID</TableHeader>
              <TableHeader>Address</TableHeader>
              <TableHeader>Timestamp</TableHeader>
              <TableHeader>Order Details</TableHeader>
            </tr>
          </thead>
          <tbody>
            {visibleOrders.map((order) => (
              <TableRow key={order.orderId}>
                <TableCell>{order.orderId}</TableCell>
                <TableCell>{order.address}</TableCell>
                <TableCell>{order.timestamp}</TableCell>
                <TableCell><Button variant='contained' onClick={handleView}>View</Button></TableCell>
              </TableRow>
            ))}
          </tbody>
        </OrdersTable>

        <PaginationContainer>
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
              color="secondary"
            />
          </Stack>
        </PaginationContainer>
      </OrdersContainer>
    </>
  );
};

export default OrdersComponent;
