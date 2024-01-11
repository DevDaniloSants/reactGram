import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setAuth(true);
    } else {
      setAuth(false);
    }

    setLoading(false);
  }, [user]);

  const redirect = () => {
    if (auth) {
      return navigate('/');
    }
  };

  return { auth, loading, redirect };
};
