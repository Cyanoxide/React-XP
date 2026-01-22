import { Provider } from "./context/provider";
import TaskBar from "./components/TaskBar/TaskBar";
import Wallpaper from "./components/Wallpaper/Wallpaper";
import Window from "./components/Window/Window";
import './App.css';

function App() {
  return (
    <Provider>
      <Wallpaper />
      <TaskBar />
      <Window title="My Portfolio" icon="/icon__internet_explorer.png"><div></div></Window>
      <Window title="Triple Triad React" icon="/icon__internet_explorer.png"><div></div></Window>
    </Provider>
  )
}

export default App;
