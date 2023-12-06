import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Header } from './components';
import { MyPage, MainNotice, SchoolCalendar, LoginRedirect } from './pages';
import { RecoilRoot } from 'recoil';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <RecoilRoot>
          <Routes>
            <Route path="/" element={<Header />}>
              <Route index element={<MainNotice />} />
              <Route path="schoolCalendar" element={<SchoolCalendar />} />
              <Route path="myPage" element={<MyPage />} />
              <Route path="login" element={<LoginRedirect />} />
              <Route path="*" element={<h1>Not Found</h1>} />
            </Route>
          </Routes>
        </RecoilRoot>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
