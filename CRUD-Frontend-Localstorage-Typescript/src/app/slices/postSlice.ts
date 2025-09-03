import {createSlice} from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit";


export interface Post {
  id: string;
  name: string;
  email: string;
  age: number;
  department: string;
}

interface PostsState {
  items: Post[];
}

const initialState: PostsState = {
  items: JSON.parse(localStorage.getItem("posts") || "[]"),
};


const postSlice = createSlice({
    name: "posts",
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      state.items.push(action.payload);
      localStorage.setItem("posts", JSON.stringify(state.items));
    },
    deletePost: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((p) => p.id !== action.payload);
      localStorage.setItem("posts", JSON.stringify(state.items));
    },

updatePost: (state, action: PayloadAction<Post>) => {
      const index = state.items.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        localStorage.setItem("posts", JSON.stringify(state.items));
      }
    },


    clearPosts:(state) => {
        state.items = [];
        localStorage.removeItem("posts")
    },
}
})



export const {addPost, deletePost, updatePost, clearPosts} = postSlice.actions;

export default postSlice.reducer

