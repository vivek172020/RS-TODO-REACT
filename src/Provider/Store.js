import { configureStore } from '@reduxjs/toolkit';
import TodoReducer from '../Reducer/TodoSlice';

const Store = configureStore({
    reducer: {
        todo: TodoReducer,
    },
});

export default Store;