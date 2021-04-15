import React from 'react';
import './App.css';
import SessionsContainer from './containers/SessionsContainer';
import Header from './components/static/Header';
import PostsContainer from './containers/PostsContainer';
import MessagesContainer from './containers/MessagesContainer';
import ReportsContainer from './containers/ReportsContainer';
import AlertHandler from './containers/AlertHandler';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <AlertHandler />
        <SessionsContainer />
        <PostsContainer />
        <MessagesContainer />
        <ReportsContainer />
      </main>
    </div>
  );
}

export default App;
