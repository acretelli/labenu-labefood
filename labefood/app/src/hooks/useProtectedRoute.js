import { useEffect } from "react";
import { useHistory } from 'react-router-dom';

export const useProtectedRoute = () => {
    const history = useHistory();
    const token = window.localStorage.getItem("token");

    useEffect(() => {
        if(token === null) {
          history.push("/login");
        }
      }, [history]);

  return token;
};