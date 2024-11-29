import { createSlice } from "@reduxjs/toolkit"

export const counterSlice = createSlice({
  name: "collectionList",
  initialState: {
    value: []
  },
  reducers: {
    setList: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { setList } = counterSlice.actions

export default counterSlice.reducer
