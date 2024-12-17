import { createSlice } from "@reduxjs/toolkit";


const invitadoSlice = createSlice({
    name: "invitado",
    initialState: {
        invitado: [],
        aceptadaRechadaza: "", // Estado para almacenar el invitado
    },
    reducers: {
        getInvitado: (state, action) => {
            state.invitado = action.payload;
        },
        changeAceptadaRechazada: (state, action) => {
            state.aceptadaRechadaza = action.payload;
            state.invitado.status = state.aceptadaRechadaza;
        }
    }
});

export const { getInvitado, changeAceptadaRechazada} = invitadoSlice.actions;

export default invitadoSlice.reducer;
