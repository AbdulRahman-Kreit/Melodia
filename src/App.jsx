import React from "react";
import SongScreen from "./Components/SongScreen";
import MainProvider from "./Contexts/MainContext";  

function App() {
  return (
    <MainProvider>
      <SongScreen />
    </MainProvider>
  );
}

export default App;