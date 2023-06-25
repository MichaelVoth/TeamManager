import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './views/main';
import AddNew from './views/addNew';
import GameStatus from './views/gameStatus';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path='/api/1337/players' element={<Main />} default />
            <Route path='/api/1337/players/add' element={<AddNew />} />
            <Route path='/api/1337/status/game' element={<GameStatus />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
