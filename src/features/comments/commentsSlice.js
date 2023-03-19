// Import createAsyncThunk and createSlice here.
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// Create loadCommentsForArticleId here.
export const loadCommentsForArticleId = createAsyncThunk(
  'comments/loadCommentsForArticleId',
  async (articleId) => {
    const comments = await fetch(`/api/articles/${articleId}/comments`);
    const json = await comments.json();
    return json;
  }
);
// Create postCommentForArticleId here.

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    // Add initial state properties here.
    //комментарии будут хранится все вместе в виде idстатьи : комментарии к статье[], добавляясь в хранилище по мере потребности
    byArticleId: {},
    isLoadingComments: false,
    failedToLoadComments: false,
  },
  // Add extraReducers here.
  extraReducers: (builder) => {
    builder.addCase(loadCommentsForArticleId.fulfilled, (state, action)=>{
      state.isLoadingComments = false;
      //передача в хранилище, ключа id стаьи : массив комментариев к этой статье
      state.byArticleId[action.payload.articleId] = action.payload.comments;
    })
    .addCase(loadCommentsForArticleId.pending, state => {
      state.isLoadingComments = true;
      state.failedToLoadComments = false;
    })
    .addCase(loadCommentsForArticleId.rejected, state => {
      state.failedToLoadComments = true;
      state.isLoadingComments = false;
      state.byArticleId = {};
    })
  }
});

//селекторы
//получение комментария для конкретной статьи
export const selectComments = (state) => state.comments.byArticleId;
//статус загрузки комментария
export const isLoadingComments = (state) => state.comments.isLoadingComments;
//статус создания комментария
export const createCommentIsPending = (state) => state.comments.createCommentIsPending;

export default commentsSlice.reducer;
