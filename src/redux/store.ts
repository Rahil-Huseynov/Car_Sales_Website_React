import { configureStore, Store } from "@reduxjs/toolkit";
import { carApi } from "../services/carApi";
import carsReducer from "../redux/slices/carSlices";

export const store: Store = configureStore({
    reducer: {
        [carApi.reducerPath]: carApi.reducer,
        cars: carsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(carApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
