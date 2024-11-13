import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getArticles = createAsyncThunk('data/getArticles', async ({ token, currentOffset }) => {
  try {
    const response = await fetch(`https://blog-platform.kata.academy/api/articles?limit=5&offset=${currentOffset}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    })
    const data = await response.json()
    return data
  } catch (err) {
    return console.log('что то пошло не так')
  }
})

export const getArticle = createAsyncThunk('data/getArticle', async ({ token, id }) => {
  try {
    const response = await fetch(`https://blog-platform.kata.academy/api/articles/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    })
    const data = await response.json()
    console.log(data)
    return data
  } catch (err) {
    return console.log('что то пошло не так')
  }
})

const showSlice = createSlice({
  name: 'showSlice',
  initialState: {
    article: {},
    items: {},
    slug: [],
    status: 'none',
    error: null,
  },
  reducers: {
    onChangeFavoritedArticle: (state) => ({
      ...state,
      article: {
        ...state.article,
        article: {
          ...state.article.article,
          favorited: !state.article.article.favorited,
          favoritesCount: state.article.article.favorited
            ? state.article.article.favoritesCount - 1
            : state.article.article.favoritesCount + 1,
        },
      },
    }),
    onChangeFavorited: (state, action) => ({
      ...state,
      items: {
        ...state.items,
        articles: state.items.articles.map((item) => {
          if (item.slug === action.payload) {
            return {
              ...item,
              favorited: !item.favorited,
              favoritesCount: item.favorited ? item.favoritesCount - 1 : item.favoritesCount + 1,
            }
          }
          return item
        }),
      },
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

export const { onPageChange, onArticleSlug, onChangeFavorited, onChangeFavoritedArticle } = showSlice.actions
export default showSlice.reducer
