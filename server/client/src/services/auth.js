export const TOKEN_KEY = "@pornase-Token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
  console.log('saindooo')
  localStorage.removeItem(TOKEN_KEY);
};