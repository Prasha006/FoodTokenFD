import { createSlice } from '@reduxjs/toolkit'
// THIS REDUX IS TO BOOK ORDERS
export const OrderSlice = createSlice({
    name: "order",
    initialState: {
        orders: []
    },
    reducers: {
        addOrder: (state, action) => {
            const item = action.payload;
            state.orders.push(item)
        },
        removeOrder: (state, action) => {
            const item = action.payload;
            const val = state.orders.filter(res => (res.name != item))
            state.orders = val
        },
        increment: (state, action) => {
            const item_name = action.payload
            state.orders.map(res => res.name === item_name ? res.quantity = res.quantity + 1 : res)
        },
        decrement: (state, action) => {
            const item_name = action.payload
            state.orders.map(res => res.name === item_name ? res.quantity = res.quantity - 1 : res)
        },
        orderReady: (state, action) => {
            const item = action.payload;
            state.orders.filter((res) => res.token_no == item.token_no ? res.order_status = true : res)
        },
        clearOrders: (state, action) => {
            state.orders = []
        }


    }
})

export const { addOrder, removeOrder, increment, decrement, clearOrders } = OrderSlice.actions

export default OrderSlice.reducer