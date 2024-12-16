// src/features/blog/blogSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Blog } from '@/types/blog';

export interface Blogs {
    blogs: Blog[];
}

const initialState: Blogs = {  // Correct type for initialState
    blogs: [],
};

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        setBlogs: (state, action: PayloadAction<Blog[]>) => {
            state.blogs = action.payload;
        },
    },
});

export const { setBlogs} = blogSlice.actions;
export default blogSlice.reducer;
