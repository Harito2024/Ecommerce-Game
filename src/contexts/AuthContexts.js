import { createContext, useEffect, useState } from "react";
import { Token, User } from "@/api";

export const AuthContext = createContext();
const tokenCtrl = new Token();
const userCtrl = new User();

export function AuthProvider(props) {
  const { children } = props;

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const token = tokenCtrl.getToken();
      if (!token) {
        logout();
        setLoading(false);
        return;
      }
      if (tokenCtrl.hasExpired(token)) {
        logout();
      } else {
        await login(token);
      }
    })();
  }, []);

  const login = async (token) => {
    try {
      //Setear el token en el localStorage
      tokenCtrl.setToken(token);
      //Obtener los datos del usuario
      const response = await userCtrl.getMe();
      //Setear los datos del usuario en el state user
      setUser(response);
      //Setear el valor del token en el state token
      setToken(token);
      //Hacer uns setLoading false
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const logout = () => {
    tokenCtrl.removeToken();
    setToken(null);
    setUser(null);
  };

  const updateUser = (key, value) => {
    setUser({
      ...user,
      [key]: value,
    });
  };

  const data = {
    accessToken: token,
    user,
    login,
    logout,
    updateUser,
  };
  if (loading) return null;

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
