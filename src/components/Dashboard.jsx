import React from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

//Header
import Header from './Header';

function Dashboard() {
  const [user, setUser] = React.useState('');
  const [token, setToken] = React.useState('');
  const [expire, setExpire] = React.useState('');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      const expire = decoded.exp;
      const currentTime = Date.now() / 1000;
      if (currentTime > expire) {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
        setUser(decoded.user);
        setToken(token);
        setExpire(expire);
      }
    }
  }, []);

  //Logout function to remove token from localstorage
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  //Get cheklist function
  const getChecklist = async () => {
    const response = await axios.get(
      'http://94.74.86.174:8080/api/checklist/',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  };

  return (
    <div>
      <Header user={user} handleLogout={handleLogout} isLoggedIn={isLoggedIn} />
    </div>
  );
}

export default Dashboard;
