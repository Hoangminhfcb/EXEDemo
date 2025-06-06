import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isLoggedIn: boolean;
    userType: string[] | null;
}

const initialState: AuthState = {
    isLoggedIn: false,
    userType: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ userType: string[] }>) => {
            state.isLoggedIn = true;
            state.userType = action.payload.userType;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.userType = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;