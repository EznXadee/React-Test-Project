import { configureStore, createSlice } from "@reduxjs/toolkit";

//To Store Data, You Must Create a Storage Unit
//It is just like React State (But Better)

//A Slice is a Class Object that Contains the Data

const user = createSlice({
    //1. All Properties
    name: "user",
    email: "email",

    //2. Initial State
    initialState: {
        name: "",
        email: "",
    },

    //3. Functions
    reducers: {
        setData(state, action) {
            state.name = action.payload["name"];
            state.email = action.payload["email"];
        },
    },
});

//Export the Slice
export const { setData } = user.actions;

const store = configureStore({
    reducer: {
        user: user.reducer,
    },
});

export default store;
