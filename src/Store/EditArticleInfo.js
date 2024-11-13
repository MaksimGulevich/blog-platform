import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const putArticle = createAsyncThunk('data/putArticle', async ({ token, article, idArticle }) => {
  const response = await fetch(`https://blog-platform.kata.academy/api/articles/${idArticle}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({ article }),
  })
  const result = await response.json()
  console.log(result)
  return result
})

export const deleteArticle = createAsyncThunk('data/deleteArticle', async ({ token, id }) => {
  try {
    const response = await fetch(`https://blog-platform.kata.academy/api/articles/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    const result = await response.json()
    return result
  } catch (err) {
    return console.log('что то пошло не так')
  }
})

export const getArticle = createAsyncThunk('data/getArticle', async (slug) => {
  try {
    const response = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}`)
    const data = await response.json()
    return data
  } catch (err) {
    return console.log('что то пошло не так')
  }
})

const editArticleInfoSlice = createSlice({
  name: 'editArticleInfoSlice',
  initialState: {
    article: {},
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
      .addCase(putArticle.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(putArticle.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        result: action.payload,
      }))
      .addCase(putArticle.rejected, (state, action) => ({
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
        tags: action.payload.article.tagList,
      }))
      .addCase(getArticle.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
      .addCase(deleteArticle.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(deleteArticle.fulfilled, (state) => ({
        ...state,
        status: 'succeeded',
      }))
      .addCase(deleteArticle.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
  },
})

export const { onTagsDelete, onTagsAdd, onClearTags } = editArticleInfoSlice.actions
export default editArticleInfoSlice.reducer
