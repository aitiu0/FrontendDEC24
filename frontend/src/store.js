import {
    combineReducers,
    applyMiddleware
} from "redux";
import thunk from "redux-thunk";
import {
    configureStore
} from "@reduxjs/toolkit";
import {
    composeWithDevTools
} from "redux-devtools-extension";
import invitationReducer from "./redux/invitationSlice";
import giftsReducer from './redux/giftsSlice'
import quizReducer from './redux/quizSlice'
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
// Combinar todos los reducers en uno solo
const rootReducer = combineReducers({
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
    // INVITATION
    invitation: invitationReducer,
    //Gifts
    gifts: giftsReducer,
    // Quiz
    quiz: quizReducer,
});
// Estado inicial
const initialState = {
    userLogin: {
        userInfo: {}
    },
};
// Middleware
const middleware = [thunk];
// Configurar el store
const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
    devTools: composeWithDevTools(),
});
// Exportar store y tipos de Redux Toolkit
export type RootState = ReturnType < typeof store.getState > ;
export type AppDispatch = typeof store.dispatch;
export default store;