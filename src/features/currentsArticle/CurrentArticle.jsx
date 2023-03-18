import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurrentArticle,
  isLoadingCurrentArticle,
} from '../currentsArticle/currentArticleSlice';
import FullArticle from '../../components/FullArticle';
//комопонент отвечает за загрузку статьи из хранилища
const CurrentArticle = () => {
  const dispatch = useDispatch();
  //получение объекта статьи из хранилища и статуса ее загрузки
  const article = useSelector(selectCurrentArticle);
  const currentArticleIsLoading = useSelector(isLoadingCurrentArticle);
  //если статья загружается выводим заглушку, есть статья не определена то возвращаем null.
  //пока не будет выбрана статьи из списка и не будет диспетчерезированно thunk функция loadCurrentArticle, конкретной статьи мы не увидим
  if (currentArticleIsLoading) {
    return <div>Loading</div>;
  } else if (!article) {
    return null;
  }
  //если статус загрузки false и статьи присутствует рендерим компонент статьи
  return <FullArticle article={article} />;
};

export default CurrentArticle;
