import './App.css';
import Blogs from './components/Blogs';
import SingleBlog from './components/SingleBlog';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path='/' element={<Blogs />} />
          <Route path='/:slug' element={<SingleBlog />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
