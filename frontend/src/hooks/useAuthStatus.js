import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// Route Guard
// This is a basically a mongo version of C:\react\house-marketplace\src\hooks\useAuthStatus.js, which is firebase verion
export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    setCheckingStatus(false);
  }, [user]);

  return { loggedIn, checkingStatus };
};
