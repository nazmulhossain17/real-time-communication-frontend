import { createSlice } from "@reduxjs/toolkit";

const conversationSlice = createSlice({
  name: "conversation",
  initialState: {
    selectedConversation: null,
    conversations: [],
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },
    setConversations: (state, action) => {
      state.conversations = action.payload;
    },
    fetchConversationsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchConversationsSuccess: (state, action) => {
      state.conversations = action.payload;
      state.loading = false;
    },
    fetchConversationsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setSelectedConversation,
  setConversations,
  fetchConversationsStart,
  fetchConversationsSuccess,
  fetchConversationsFailure,
} = conversationSlice.actions;

export default conversationSlice.reducer;
