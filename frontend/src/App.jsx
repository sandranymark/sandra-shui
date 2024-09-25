
import './App.css';
import { Routes, Route } from 'react-router-dom';
import AddMessage from './components/AddMessage/AddMessage.jsx';

import MessageList from './components/MessageList/MessageList.jsx';

function App() {

  return (
    <>
      <div className="App">

        <Routes>
          <Route exact path="/" element={<MessageList />} />
          <Route path="/add-message" element={<AddMessage />} />

        </Routes>
      </div>
    </>
  );
}

export default App;