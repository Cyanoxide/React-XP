import { Provider } from "./context/provider";
import { useState } from "react";
import TaskBar from "./components/TaskBar/TaskBar"
import './App.css';

function App() {
  const [backgroundImage, setBackgroundImage] = useState("/wallpaper__default.jpg");

  return (
    <Provider>
      <img src={backgroundImage} width="100%" height="100%" className="fixed inset-0 object-cover object-center h-full" />
      <TaskBar />
    </Provider>
  )
}

export default App;
