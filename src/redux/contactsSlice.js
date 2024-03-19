import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
  },
  reducers: {
    addContact(state, { payload }) {
      state.items.push(payload);
    },
    prepare: (data) => {
      return {
        payload: {
          id: nanoid(),
          ...data,
        },
      };
    },

    deleteContact(state, { payload }) {
      (state.items = state.items.filter((item) => item.id !== payload)),
        console.log(state.items);
      console.log(payload);
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export default contactsSlice.reducer;
