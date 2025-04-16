const Layout = ({ children }) => {
  return (
    <div className="grid grid-rows-[1fr_9fr_1fr] h-screen">
      { children }
    </div>
  );
};

export default Layout;
