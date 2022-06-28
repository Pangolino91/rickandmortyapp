import './App.css';
import CharactersList from './components/characters/CharactersList'
import { Routes, Route, Link } from "react-router-dom";
import FavList from './components/characters/FavList';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CharactersList />} />
        <Route path="favlist" element={<FavList />} />
      </Routes>
    </div>
  );
}

export default App;
