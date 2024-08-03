// store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import userReducer from "./userSlice/userSlice";
import conversationReducer from "./conversation/conversationSlice";
import messageReducer from "./messageSlice/messageSlice";
import authReducer from "./authSlice/authSlice";

const persistConfig = {
  key: "root",
  storage,
};

// Wrap reducers that need persistence with persistReducer
const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedMessageReducer = persistReducer(persistConfig, messageReducer);
const persistedConversationReducer = persistReducer(
  persistConfig,
  conversationReducer
);
const persistedAuthReducer = persistReducer(persistConfig, authReducer); // Add persisted auth reducer

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    message: persistedMessageReducer,
    conversation: persistedConversationReducer,
    auth: persistedAuthReducer, // Add auth reducer here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
