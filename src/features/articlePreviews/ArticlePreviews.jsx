import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadAllPreviews,
  selectAllPreviews,
  isLoading,
} from './articlePreviewsSlice';
//для загрузки конкртеной статьи, будет передан в обработчик нажатия на превью статьи
import { loadCurrentArticle } from '../currentsArticle/currentArticleSlice';
import ArticleListItem from '../../components/ArticleListItem';

const ArticlePreviews = () => {
  const dispatch = useDispatch();
  //селекторый который позволяют загрузить все превью статей из хранилища, а так же статус загрузки статей
  const articlePreviews = useSelector(selectAllPreviews);
  const isLoadingPreviews = useSelector(isLoading);

  //загрузка статей в хранилище из API
  useEffect(() => {
    dispatch(loadAllPreviews());
  }, [dispatch]);
  
  //если статус загрузки true, то выводим сообщение
  if (isLoadingPreviews) {
    return <div>loading state</div>;
  }
  //если false, то рендерим компонент
  return (
    <>
      <section className='articles-container'>
        <h2 className='section-title'>All Articles</h2>
        {articlePreviews.map((article) => (
          <div key={article.id} onClick={(e) => dispatch(loadCurrentArticle(article.id))}>
            <ArticleListItem article={article} />
          </div>
        ))}
      </section>
    </>
  );
};

export default ArticlePreviews;
