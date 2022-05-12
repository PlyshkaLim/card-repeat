import React, {useState} from 'react';
import './App.css';
import CardList from "./components/CardList/CardList";
import {
  Routes,
  Route,
} from "react-router-dom";
import Card from "./components/Card/Card";
import Statistics from "./components/Statistics/Statistics";
import AddCard from "./components/AddCard/AddCard";
import QuestionsList from "./components/QuestionsList/QuestionsList";
import AddGroup from "./components/AddGroup/AddGroup";

export const CurrentListIdContext = React.createContext<any>({
  CurrentListId: 0,
  dispatchChangeCurrentListId: () => {
  }
});

const App: React.FC = () => {
  const [cardBase, setCardBase] = useState<any[]>(loadState('CardBase', []));
  const [currentListId, setCurrentListId] = useState<number>(0);

  function loadState(key: string, defaultValue: any) {
    const state = JSON.parse(localStorage.getItem(key) as string);
    if (state !== null && typeof state !== 'undefined') return state;
    return defaultValue;
  }

  return (
    <CurrentListIdContext.Provider
      value={{
        CurrentListId: currentListId,
        dispatchChangeCurrentListId: (value: number) => setCurrentListId(value)
      }}
    >
      <div className="App">
        <Routes>
          <Route path="/" element={<CardList cardBase={cardBase}/>}/>
          <Route path="/card/:id" element={<Card cardBase={cardBase}/>}/>
          <Route path="/card/:id/statistics" element={<Statistics cardBase={cardBase}/>}/>
          <Route path="/card/:id/questions_list" element={<QuestionsList cardBase={cardBase}/>}/>
          <Route path="/add_card" element={<AddCard cardBase={cardBase} setCardBase={setCardBase}/>}/>
          <Route path="/add_new_group" element={<AddGroup cardBase={cardBase} setCardBase={setCardBase}/>}/>
        </Routes>
      </div>
    </CurrentListIdContext.Provider>
  );
}

export default App;
