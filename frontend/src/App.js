import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<h1>Home</h1>} />
          <Route path="schoolCalendar" element={<h1>schoolCalendar</h1>} />
          <Route path="myPage" element={<h1>myPage</h1>} />
          <Route path="login" element={<h1>login</h1>} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
