import React from "react";

const UserContext = React.createContext({ email: '', auth: false });
const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState(() => {
    // Lấy dữ liệu từ localStorage nếu có
    const storedToken = localStorage.getItem('token');
    const storedEmail = localStorage.getItem('email');
    return {
      email: storedEmail || '',
      auth: !!storedToken // Chuyển đổi thành boolean từ dữ liệu lưu trữ token
    };
  });

  const loginContext = (email, token) => {
    setUser({
      email: email,
      auth: true,
    });
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setUser({
      email: '',
      auth: false,
    });
    window.location.reload();
  };

  return (
    <UserContext.Provider value={{ user, loginContext, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
