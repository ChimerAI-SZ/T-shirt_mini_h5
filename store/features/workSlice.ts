import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
// 定义状态类型
interface GlobalState {
  workInfo: any | null
  params: object | null
  taskId: any[]
  work: number
  generateImage: any[]
}

// 定义异步请求的类型
interface FetchGlobalDataPayload {
  _showLoading?: boolean
}

export const fetchGlobalData = createAsyncThunk(
  "UserState/fetchGlobalData",
  async (_showLoading: boolean = true, { dispatch }) => {
    // 这里进行实际的异步请求和逻辑处理
    // 可以通过dispatch执行其它actions
  }
)

// workSlice 的 initialState 类型化
const workSlice = createSlice({
  name: "work",
  initialState: {
    workInfo: "tses",
    params: {},
    taskId: [],
    work: 0,
    generateImage: []
  } as GlobalState, // 类型声明
  reducers: {
    setWorkInfo: (state, action: PayloadAction<any>) => {
      state.workInfo = action.payload
    },
    setParams: (state, action: PayloadAction<any>) => {
      state.params = action.payload
    },
    setTaskId: (state, action: PayloadAction<any[]>) => {
      state.taskId = action.payload
    },
    setWork: (state, action: PayloadAction<number>) => {
      state.work = action.payload
    },
    setGenerateImage: (state, action: PayloadAction<any[]>) => {
      state.generateImage = action.payload
    }
  }
})

// 导出 action 和 reducer
export const { setWorkInfo, setParams, setTaskId, setWork, setGenerateImage } = workSlice.actions

export default workSlice.reducer
