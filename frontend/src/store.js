import { combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegisterReducer,
  userVerifyReducer,
  userVerifyStatusReducer,
} from "./reducers/userReducer";

import {
  adminGuestCreateReducer,
  adminGuestDetailsReducer,
  adminGuestUpdateReducer,
  adminGuestDeleteReducer,
  adminGuestListReducer,
} from "./reducers/guestReducer";
import {
  adminProductCreateReducer,
  adminProductDeleteReducer,
  adminProductUpdateReducer,
  adminProductDetailsReducer,
  adminProductsListReducer,
  productsListReducer,
  productSearchReducer,
  productLimitsReducer,
} from "./reducers/productReducer";
import {
  adminBrandCreateReducer,
  adminBrandDetailsReducer,
  adminBrandUpdateReducer,
  adminBrandDeleteReducer,
  adminBrandListReducer,
} from "./reducers/brandReducer";
import {
  adminCategoryCreateReducer,
  adminCategoryDetailsReducer,
  adminCategoryUpdateReducer,
  adminCategoryDeleteReducer,
  adminCategoryListReducer,
} from "./reducers/categoryReducer";

const reducers = combineReducers({
  // USER
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userVerifyStatus: userVerifyStatusReducer,
  userVerify: userVerifyReducer,

  // GUEST
  adminGuestCreate: adminGuestCreateReducer,
  adminGuestDetails: adminGuestDetailsReducer,
  adminGuestUpdate: adminGuestUpdateReducer,
  adminGuestDelete: adminGuestDeleteReducer,
  adminGuestList: adminGuestListReducer,
 // PRODUCT
 adminProductCreate: adminProductCreateReducer,
 adminProductDelete: adminProductDeleteReducer,
 adminProductUpdate: adminProductUpdateReducer,
 adminProductDetails: adminProductDetailsReducer,
 adminProductsList: adminProductsListReducer,
 productsList: productsListReducer,
 productSearch: productSearchReducer,
 productLimits: productLimitsReducer,
  // CATEGORY
  adminCategoryCreate: adminCategoryCreateReducer,
  adminCategoryDetails: adminCategoryDetailsReducer,
  adminCategoryUpdate: adminCategoryUpdateReducer,
  adminCategoryDelete: adminCategoryDeleteReducer,
  adminCategoryList: adminCategoryListReducer,
  // BRAND
  adminBrandCreate: adminBrandCreateReducer,
  adminBrandDetails: adminBrandDetailsReducer,
  adminBrandUpdate: adminBrandUpdateReducer,
  adminBrandDelete: adminBrandDeleteReducer,
  adminBrandList: adminBrandListReducer,
  
});

const initialState = {
  userLogin: { userInfo: {} },
};

const middleware = [thunk];

const store = configureStore(
  { reducer: reducers },
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
