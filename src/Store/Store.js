import { configureStore } from '@reduxjs/toolkit'

import showReducer from './ShowSlice'
import userInfoReducer from './UserInfo'
import articleInfoReducer from './ArticleInfo'
import editArticleInfoReducer from './EditArticleInfo'
import showFavoritesReducer from './PostFavorite'

export default configureStore({
  reducer: {
    show: showReducer,
    userInfo: userInfoReducer,
    articleInfo: articleInfoReducer,
    editArticleInfo: editArticleInfoReducer,
    showFavorites: showFavoritesReducer,
  },
})
