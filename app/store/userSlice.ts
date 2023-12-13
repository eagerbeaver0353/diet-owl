import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  token: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser(state, action) {
      const {name, email, token} = action.payload;
      state.name = name;
      state.email = email;
      state.token = token;
    },
    updateToken(state, action) {
      state.token = action.payload.token;
    },
    clearUser() {
      return initialState;
    },
  },
});

export const {updateUser, updateToken, clearUser} = userSlice.actions;

export default userSlice.reducer;
