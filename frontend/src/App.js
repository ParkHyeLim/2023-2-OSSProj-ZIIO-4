import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components';
import { MyPage, MainNotice, SchoolCalendar } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<MainNotice />} />
          <Route path="schoolCalendar" element={<SchoolCalendar />} />
          <Route path="myPage" element={<MyPage />} />
          <Route path="login" element={<h1>login</h1>} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
