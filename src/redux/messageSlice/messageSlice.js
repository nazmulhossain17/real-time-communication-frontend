import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {
    sendMessageStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    sendMessageSuccess: (state, action) => {
      state.messages.push(action.payload);
      state.loading = false;
    },
    sendMessageFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const {
  sendMessageStart,
  sendMessageSuccess,
  sendMessageFailure,
  setMessages,
} = messageSlice.actions;

export default messageSlice.reducer;
