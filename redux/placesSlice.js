import { createSlice } from "@reduxjs/toolkit";



const initialPlacesState = {
    places: [],
    placeTypes: [],
}

export const placesSlice = createSlice({
    name: 'places',
    initialState: initialPlacesState,
    reducers: {
        setPlaces: (state, action) => {
            //console.log('data in redux:', action.payload)
            state.places = action.payload;
        },
        setPlaceTypes: (state, action) => {
            //console.log("place types in redux:", action.payload)
            state.placeTypes = action.payload;
        },
    }
})


export const { setPlaces, setPlaceTypes } = placesSlice.actions;
export default placesSlice.reducer;