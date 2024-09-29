import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router,  Routes } from 'react-router-dom';
import { Navbar } from './shared';
import Home from './pages/home';
import Login from './pages/login';
import { AuthProvider } from './context';
import Register from './pages/register';
import ChooseChalet from './pages/choose-chalet';
import VoteResults from './pages/vote-results';
import CreateChalet from './pages/сreate-chalet';

const App: React.FC = () => {
    return (
      <AuthProvider>
          <Router>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/choose-chalet" element={<ChooseChalet />} />
                  <Route path="/reactions/results" element={<VoteResults />} />
                  <Route path="/create-chalet" element={<CreateChalet />} />
              </Routes>
          </Router>
        </AuthProvider>
    );
};

export default App;
