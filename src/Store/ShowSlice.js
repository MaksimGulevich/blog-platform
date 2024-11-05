import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getArticles = createAsyncThunk('data/getArticles', async (page) => {
  const response = await fetch(`https://blog-platform.kata.academy/api/articles?limit=5&offset=${page}`)
  const data = await response.json()
  return data
})

export const getArticle = createAsyncThunk('data/getArticle', async (slug) => {
  const response = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}`)
  const data = await response.json()
  return data
})

const showSlice = createSlice({
  name: 'showSlice',
  initialState: {
    article: '',
    offset: 0,
    page: 1,
    items: [],
    status: 'none',
    statusTickets: 'none',
    error: null,
  },
  reducers: {
    onPageChange: (state, action) => ({
      ...state,
      page: action.payload,
      offset: (action.payload - 1) * 5,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArticles.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(getArticles.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        items: action.payload,
      }))
      .addCase(getArticles.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
      .addCase(getArticle.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(getArticle.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        article: action.payload,
      }))
      .addCase(getArticle.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
  },
})

export const { onPageChange, onArticleSlug } = showSlice.actions
export default showSlice.reducer
