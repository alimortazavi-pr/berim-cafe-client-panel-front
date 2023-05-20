import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

//Reducers
import layoutsReducer from "./layouts";
import authReducer from "./auth";
import profileReducer from "./profile";
import categoriesReducer from "./categories";
import menuReducer from "./menu";
import reservationsReducer from "./reservations";

export function makeStore() {
  return configureStore({
    reducer: {
      layouts: layoutsReducer,
      auth: authReducer,
      profile: profileReducer,
      categories: categoriesReducer,
      menu: menuReducer,
      reservations: reservationsReducer,
    },
  });
}

const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
