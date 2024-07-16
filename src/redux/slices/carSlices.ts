import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { carApi } from "../../services/carApi";

interface ICar {
  id: number;
  make: string;
  model: string;
  year: number;
  color: string;
  mileage: number;
  price: number;
  fuelType: string;
  transmission: string;
  engine: string;
  horsepower: number;
  features: string[];
  owners: number;
  image: string;
}

interface ICars {
  cars: ICar[];
  nextId: number;
}

const initialState: ICars = {
  cars: [],
  nextId: 31,
};

const carsSlice = createSlice({
  name: "CarSlice",
  initialState,
  reducers: {
    addCar: (state, action: PayloadAction<Omit<ICar, 'id'>>) => {
      const newCar = {
        ...action.payload,
        id: state.nextId,
      };
      state.cars.push(newCar);
      state.nextId += 1;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      carApi.endpoints.getCar.matchFulfilled,
      (state, action) => {
        state.cars = action.payload;
      }
    );
  },
});

export const { addCar } = carsSlice.actions;
export default carsSlice.reducer;
