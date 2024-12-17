import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoaded: false,
    eventName: "Residencia falling water",
    eventDate: "14 de Diciembre, 2024",
    eventTime: "16:00 - 21:00",
    guessName: "Test",
    guessLastName: "Last test",
    guessAccept: "N",
    guessPlusOne: "N",
    guessAllergies: "",
};

export const invitationSlice = createSlice({
    name: "invitation",
    initialState,
    reducers: {
        setLoaded: (state, action) => {
            state.isLoaded = action.payload;
        },
        updateEventDetails: (state, action) => {
            return { ...state, ...action.payload };
        },
    },
});

export const { setLoaded, updateEventDetails } = invitationSlice.actions;

export default invitationSlice.reducer;
