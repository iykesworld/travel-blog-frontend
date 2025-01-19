import { createSlice } from "@reduxjs/toolkit";
const isTokenPresentInCookies = () => {
    const token = document.cookie
        .split(';')
        .find(cookie => cookie.trim().startsWith('token='));
        return Boolean(token); // Return true if the token exists
};
// Save user to localStorage
export const saveUserToLocalStorage = (user) => {
    try {
        if (user === undefined || user === null) {
            console.error("No user object provided to saveUserToLocalStorage");
            return;
        }
        const serializedState = JSON.stringify(user);
        localStorage.setItem('user', serializedState);
        console.log("User successfully saved to localStorage:", serializedState);
    } catch (error) {
        console.error("Error saving user to localStorage:", error);
    }
};

const loadUserFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('user');
        if (!serializedState) {
            return { user: null }; // No user found
        }

        const parsedState = JSON.parse(serializedState);
        return { user: parsedState };
    } catch (error) {
        console.error("Error loading user from localStorage:", error);
        return { user: null };
    }
};

const initialState = {
    ...loadUserFromLocalStorage(),
    isAuthenticated: isTokenPresentInCookies(),
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action){
            state.user = action.payload;
            state.isAuthenticated = true;
            saveUserToLocalStorage(action.payload);  // Consistent storage
        },
        logout(state){
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('user');

            // Improved cookie removal
            document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax; Secure';
        }
    }
});


// const initialState = loadUserFromLocalStorage();
// const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {
//         setUser(state, action){
//             state.user = action.payload.user;
//             localStorage.setItem('user', JSON.stringify(state.user));
//         },
//         logout(state){
//             state.user = null;
//             localStorage.removeItem('user');
//             document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'; // Clear the token cookie
//         }
//     }
// })

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;