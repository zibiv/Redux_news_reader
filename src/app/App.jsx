// import './App.css';
import React from 'react';
import ArticlePreviews from '../features/articlePreviews/ArticlePreviews';
import CurrentArticle from '../features/currentsArticle/CurrentArticle';
import Comments from '../features/comments/Comments';

function App() {
  return (
    <div className='App'>
      <header className='App-header' />
      <main>
        <div className='current-article'>
          <CurrentArticle />
          //комментарии должны загружаться к конкретной статье
          <Comments />
        </div>
        <ArticlePreviews />
      </main>
    </div>
  );
}

export default App;
