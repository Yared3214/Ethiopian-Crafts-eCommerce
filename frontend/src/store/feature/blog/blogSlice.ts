// src/features/blog/blogSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BlogResponse } from '@/types/blog';

export interface Blogs {
    blogs: BlogResponse[];
}

const initialState: Blogs = {  // Correct type for initialState
    blogs: [],
};

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        setBlogs: (state, action: PayloadAction<BlogResponse[]>) => {
            state.blogs = action.payload;
        },
    },
});

export const { setBlogs} = blogSlice.actions;
export default blogSlice.reducer;
