/* eslint-disable react/react-in-jsx-scope */
import './App.css';
import Converter from './components/Converter/Converter';
import Navbar from './components/Navbar/Navigationbar';
import { Toaster} from "react-hot-toast";

function App() {
  return (
    <div>
      <Navbar />
      <Converter />
    <div><Toaster/></div>
    </div>
  );
}

export default App;
