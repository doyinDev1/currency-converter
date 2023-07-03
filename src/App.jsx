/* eslint-disable react/react-in-jsx-scope */
import './App.css';
import Converter from './components/Converter/Converter';
import Navbar from './components/Navbar/Navigationbar';

function App() {
  return (
    <div>
      <Navbar />
      <Converter />
    </div>
  );
}

export default App;
