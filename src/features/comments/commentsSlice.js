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
export const postCommentForArticleId = createAsyncThunk(
  'comments/postCommentForArticleId',
  async ({ articleId, commentToPost }) => {
    const comment = await fetch(`/api/articles/${articleId}/comments`, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        articleId:articleId,
        comment: commentToPost
      })
    });
    const json = await comment.json();
    return json;
  }
);
export const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    // Add initial state properties here.
    //комментарии будут хранится все вместе в виде idстатьи : комментарии к статье[], добавляясь в хранилище по мере потребности
    byArticleId: {},
    isLoadingComments: false,
    failedToLoadComments: false,
    createCommentIsPending: false,
    failedToCreateComment: false,
  },
  // Add extraReducers here.
  extraReducers: (builder) => {
    builder.addCase(loadCommentsForArticleId.fulfilled, (state, action)=>{
      state.isLoadingComments = false;
      failedToLoadComments: false;
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
    .addCase(postCommentForArticleId.fulfilled, (state, action)=>{
      state.createCommentIsPending = false;
      state.failedToCreateComment = false;
      state.byArticleId[action.payload.articleId].push(action.payload);
    })
    .addCase(postCommentForArticleId.pending, state => {
      state.createCommentIsPending = true;
      state.failedToCreateComment = false;
    })
    .addCase(postCommentForArticleId.rejected, state => {
      state.failedToCreateComment = true;
      state.createCommentIsPending = false;
    })
  }
});

//селекторы
//получение всех загруженных комментариев
export const selectComments = (state) => state.comments.byArticleId;
//статус загрузки комментария
export const isLoadingComments = (state) => state.comments.isLoadingComments;
//статус создания комментария
export const createCommentIsPending = (state) => state.comments.createCommentIsPending;

export default commentsSlice.reducer;
