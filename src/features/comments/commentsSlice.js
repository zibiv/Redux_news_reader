// Import createAsyncThunk and createSlice here.

// Create loadCommentsForArticleId here.

// Create postCommentForArticleId here.

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    // Add initial state properties here.
  },
  // Add extraReducers here.
});

//селекторы
//получение комментария для конкретной статьи
export const selectComments = (state) => state.comments.byArticleId;
//статус загрузки комментария
export const isLoadingComments = (state) => state.comments.isLoadingComments;
//статус создания комментария
export const createCommentIsPending = (state) => state.comments.createCommentIsPending;

export default commentsSlice.reducer;
