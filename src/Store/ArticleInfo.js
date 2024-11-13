import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const postArticle = createAsyncThunk('data/postArticle', async ({ token, article }) => {
  try {
    const response = await fetch('https://blog-platform.kata.academy/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ article }),
    })

    const result = await response.json()
    return result
  } catch (err) {
    return console.log('что то пошло не так')
  }
})

const articleInfoSlice = createSlice({
  name: 'articleInfoSlice',
  initialState: {
    tags: [],
    countTags: null,
    result: {},
    token: '',
    status: 'none',
    error: null,
  },
  reducers: {
    onTagsDelete: (state, action) => ({
      ...state,
      tags: state.tags.filter((i) => {
        if (i !== action.payload) {
          return i
        }
        return null
      }),
    }),
    onTagsAdd: (state) => ({
      ...state,
      countTags: state.countTags + 1,
      tags: state.tags.concat(state.countTags + 1),
    }),
    onClearTags: (state) => ({
      ...state,
      tags: [],
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(postArticle.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(postArticle.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        result: action.payload,
      }))
      .addCase(postArticle.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
  },
})

export const { onTagsDelete, onTagsAdd, onClearTags } = articleInfoSlice.actions
export default articleInfoSlice.reducer
