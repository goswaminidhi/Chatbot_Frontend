// import React, { useState } from 'react';
// import { AuthProvider, useAuth } from './context/AuthContext';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import ChatWindow from './components/ChatWindow';
// import './App.css';

// function AppContent() {
//   const { token } = useAuth();
//   const [view, setView] = useState('login');

//   if (token) {
//     return <ChatWindow />;
//   }

//   return view === 'login' ? (
//     <Login onSwitchToSignup={() => setView('signup')} />
//   ) : (
//     <Signup onSwitchToLogin={() => setView('login')} />
//   );
// }

// export default function App() {
//   return (
//     <AuthProvider>
//       <AppContent />
//     </AuthProvider>
//   );
// }

import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';
import ChatWindow from './components/ChatWindow';
import './App.css';

function AppContent() {
  const { token } = useAuth();
  const [view, setView] = useState('login');

  return (
    <div className="App">
      {token ? (
        <ChatWindow />
      ) : view === 'login' ? (
        <Login onSwitchToSignup={() => setView('signup')} />
      ) : (
        <Signup onSwitchToLogin={() => setView('login')} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}