import LoginBanner from "../bannerPages/loginBanner";
import Service from "../Service";
import AuthUserHeader from "./headerUser";
import SubHeaderUser from "./subHeader";
const Dashboard = () => {
  return (
    <>
    <AuthUserHeader></AuthUserHeader>
     <SubHeaderUser></SubHeaderUser>
      {/* start Banner */}
      <LoginBanner/>
      {/* end Banner */}
      {/* start services */}
      <Service></Service>
      {/* end services */}
    </>
  );
};
export default Dashboard;


