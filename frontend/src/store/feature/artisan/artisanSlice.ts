// src/features/artisan/artisanSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArtisansResponse } from '@/types/artisan';

export interface Artisans {
    artisans: ArtisansResponse[];
}

const initialState: Artisans = {  // Correct type for initialState
    artisans: [],
};

const artisanSlice = createSlice({
    name: 'artisan',
    initialState,
    reducers: {
        setArtisans: (state, action: PayloadAction<ArtisansResponse[]>) => {
            state.artisans = action.payload;
        },
        updateArtisan: (state, action: PayloadAction<ArtisansResponse>) => {
                    const updated = action.payload;
                    const artisan = state.artisans.find(u => u._id === updated._id);
                    if (artisan) {
                      Object.assign(artisan, updated); // ← Same array, same user object
                    }
                  },
    },
});

export const { setArtisans, updateArtisan } = artisanSlice.actions;
export default artisanSlice.reducer;
