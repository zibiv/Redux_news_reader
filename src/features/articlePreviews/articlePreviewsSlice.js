import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
//ACTION CREATORS
//создание асинхронного thunk action creator, для получения данных статей из API
export const loadAllPreviews = createAsyncThunk(
  'articlePreviews/loadAllPreviews',
  async () => {
    const data = await fetch('api/articles');
    const json = await data.json();
    return json;
  }
);

//СОЗДАНИЕ СЛАЙСА для статей
export const articlePreviewsSlice = createSlice({
  name: 'articlePreviews',
  initialState: {
    articles: [],//массив объектов, где каждый объект это отдельная статья
    isLoadingArticlePreviews: false,
    hasError: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAllPreviews.pending, (state) => {
        state.isLoadingArticlePreviews = true;
        state.hasError = false;
      })
      .addCase(loadAllPreviews.fulfilled, (state, action) => {
        state.isLoadingArticlePreviews = false;
        state.articles = action.payload;
      })
      .addCase(loadAllPreviews.rejected, (state, action) => {
        state.isLoadingArticlePreviews = false;
        state.hasError = true;
        state.articles = [];//если ошибка при выполнении асинхронного запроса, очищаем массив статей в хранилище
      })
  },
});

//>>СОЗДАНИЕ СЕЛЕКТОРОВ
//получение всех статей из состояния
export const selectAllPreviews = (state) => state.articlePreviews.articles;
//получение статуса загрузки из состояния
export const isLoading = (state) => state.articlePreviews.isLoading;

export default articlePreviewsSlice.reducer;
