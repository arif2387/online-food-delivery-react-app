import { createSlice } from "@reduxjs/toolkit";

const AddItems = createSlice({
  name: "form",
  initialState: {
    items: [],
    itemName: "",
    price: "",
    description: "",
    isVegetarian: false,
    itemNameError: "",
    priceError: "",
    isLoading: false,
    itemImage: null,
  },
  reducers: {
    addItems: (state, action) => {
      state.items = state.items.concat(action.payload);
    },
    deleteItem: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.itemId !== itemId);
    },
    updateItem: (state, action) => {
      const updatedItemData = action.payload;

      const itemIndex = state.items.findIndex(
        (item) => item.itemId === updatedItemData.itemId
      );

      if (itemIndex !== -1) {
        const updatedItems = [
          ...state.items.slice(0, itemIndex),
          updatedItemData,
          ...state.items.slice(itemIndex + 1),
        ];
        state.items = updatedItems;
      }
    },
    getItem: (state, action) => {
      const itemId = action.payload;
      const item = state.items.find((item) => item.itemId === itemId);
      state.itemName = item.itemName;
      state.price = item.price;
      state.itemImage = item.itemImage;
      state.description = item.description;
      state.isVegetarian = item.isVegetarian;
    },
    setImage: (state, action) => {
      state.itemImage = action.payload;
    },
    setField: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    setCheckbox: (state, action) => {
      const { name, checked } = action.payload;
      state[name] = checked;
    },
    setError: (state, action) => {
      const { name, error } = action.payload;
      state[`${name}Error`] = error;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    clearForm: (state) => {
      state.itemName = "";
      state.price = "";
      state.description = "";
      state.isVegetarian = true;
      state.itemNameError = "";
      state.priceError = "";
      state.isLoading = false;
    },
  },
});

export const {
  setField,
  setCheckbox,
  setError,
  setLoading,
  clearForm,
  setImage,
  addItems,
  deleteItem,
  getItem,
  updateItem
} = AddItems.actions;

export const AddItemsReducer = AddItems.reducer;

// ordersSlice

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    selectedStatus: "",
    selectedOrderId: null,
    currentPage: 1,
    pageSize: 5,
  },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setSelectedStatus: (state, action) => {
      state.selectedStatus = action.payload;
    },
    setSelectedOrderId: (state, action) => {
      state.selectedOrderId = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    handleStatusChange: (state, action) => {
      const { orderId, newStatus } = action.payload;
      state.selectedOrderId = orderId;
      state.selectedStatus = newStatus;
      state.orders = state.orders.map((order) =>
        order.orderId === orderId ? { ...order, orderStatus: newStatus } : order
      );
    },
  },
});

export const {
  setOrders,
  setSelectedStatus,
  setSelectedOrderId,
  setCurrentPage,
  handleStatusChange,
} = ordersSlice.actions;

export const ordersReducer = ordersSlice.reducer;
