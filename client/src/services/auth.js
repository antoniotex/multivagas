export const TOKEN_KEY = "@pornase-Token";
export const USER_NAME = "@pornase-Name"
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getName = () => localStorage.getItem(USER_NAME)
export const login = (token, nome) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_NAME, nome)
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};