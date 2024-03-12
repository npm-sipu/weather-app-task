import { Outlet } from "react-router-dom";
import Header from "./Header";

const RootLayout = () => {
  return (
    <div>
      <Header />

      <main className='h-screen box-border'>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
