import Footer from "../common/Footer";
import Header from "../common/Header";
import { Outlet } from "react-router-dom";
const UserLayout = () => {
  return (
    <>
      <>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </>
    </>
  );
};

export default UserLayout;
