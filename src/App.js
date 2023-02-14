// import logo from './logo.svg';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query'
import User from './components/User';
import UserDetail from './components/UserDetail';
import { Routes, Route } from 'react-router-dom';
import AddUser from './components/AddUser';

// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path="/addUser" element={<AddUser />} />
      </Routes>
    </QueryClientProvider>
  );
}
export default App;
