import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./component/Home";
import About from "./component/About";

import Blog from "./component/bannerPages/Blog";
import Contact from "./component/Contact";
import Project from "./component/Project";
import Service from "./component/Service";
import Team from "./component/Team";
import Testimonial from "./component/Testimonial";
import UserLayout from "./component/userLayout/userLayout";
import AdminLayout from "./adminComponent/Layout/adminLayout";
import AdminDashbBoard from "./adminComponent/adminComponent/adminDashboard";
import SiteSetting from "./adminComponent/adminComponent/siteSetting";
import SocialMedia from "./adminComponent/adminComponent/socialmedia/socialMedia";
import SocialMediaEdit from "./adminComponent/adminComponent/socialmedia/socialMediaEdit";
import BannerTable from "./adminComponent/adminComponent/banner/banner";
import BannerEdit from "./adminComponent/adminComponent/banner/bannerEdit";
import Billing from "./component/Billing";
import AboutAdmin from "./adminComponent/adminComponent/about/about";
import AboutEdit from "./adminComponent/adminComponent/about/aboutEdit";
import ServicesPage from "./adminComponent/adminComponent/siteServices/service";
import ServiceEdit from "./adminComponent/adminComponent/siteServices/serviceEdit";
import ProjectsPage from "./adminComponent/adminComponent/Projects/projects";
import ProjectEditPage from "./adminComponent/adminComponent/Projects/projectEdit";
import OurTeamPage from "./adminComponent/adminComponent/our-team/ourTeam";
import OurTeamEdit from "./adminComponent/adminComponent/our-team/ourTeamEdit";
import ContactData from "./adminComponent/adminComponent/contact/contactData";
import ContactForm from "./adminComponent/adminComponent/contact/contactForm";
import FooterData from "./adminComponent/adminComponent/footer/footer";
import BillingData from "./adminComponent/adminComponent/billing/billing";
import SinInPage from "./adminComponent/authPage/SignInPage";
import ProtectedRoute from "./adminComponent/authPage/protectRoutes";
import { AuthProvider } from "./adminComponent/authPage/contex";
import LoginUser from "./component/authPagesForUser/loginPage";
import { AuthProviderUser } from "./component/authPagesForUser/contexUser";
import Dashboard from "./component/authenticUserPages/dashboard";
import ProtectedRouteUser from "./component/authPagesForUser/protectRoutesUser";
import UserFormFillPage from "./component/authenticUserPages/userFormFill";
import ApplyFormData from "./adminComponent/adminComponent/userApplyForm/applyFormData";
import PartnerPage from "./adminComponent/adminComponent/parthnerPage/parthnerPage";
import BecomePartnerForm from "./adminComponent/adminComponent/parthnerPage/becomePartner";
import LoanDataEdit from "./adminComponent/adminComponent/lloanProductPage/AdminloanProductEdit";
import LoanServicesPage from "./adminComponent/adminComponent/lloanProductPage/AdminloanProduct";
import EditPartnerPage from "./adminComponent/adminComponent/parthnerPage/editPertherData";
import PaymentRequestPage from "./adminComponent/adminComponent/paymentRequest/paymentRequest";
import LinkWithHttpDataTable from "./adminComponent/adminComponent/userLinkData/viewUserLinkData";
import ViewDelarPage from "./adminComponent/adminComponent/delarPage/viewDelarPage";
import AddDelarPage from "./adminComponent/adminComponent/delarPage/AddDelar";
import EditDelarPage from "./adminComponent/adminComponent/delarPage/EditDelar";
import ViewTeamPage from "./component/authenticUserPages/viewTeamPage";

function App() {
  return (
    <AuthProvider>
      <AuthProviderUser>
        <Router>
          <Routes>
            <Route path="/" element={<UserLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/project" element={<Project />} />
              <Route path="/service" element={<Service />} />
              <Route path="/team" element={<Team />} />
              <Route path="/testimonial" element={<Testimonial />} />
              <Route path="/billing" element={<Billing />} />
            </Route>
            <Route path="/login-User" element={<LoginUser />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRouteUser>
                  <Dashboard />
                </ProtectedRouteUser>
              }
            />
            <Route
              path="/user-apply-form"
              element={
                <ProtectedRouteUser>
                  <UserFormFillPage />
                </ProtectedRouteUser>
              }
            />
              <Route
              path="/ViewTeamPage"
              element={
                <ProtectedRouteUser>
                  <ViewTeamPage />
                </ProtectedRouteUser>
              }
            />

            <Route path="/admin/login" element={<SinInPage />} />
            <Route path="/" element={<AdminLayout />}>
              <Route
                path="admin/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashbBoard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="admin/setting/site"
                element={
                  <ProtectedRoute>
                    <SiteSetting />
                  </ProtectedRoute>
                }
              />
              <Route
                path="admin/setting/social_media"
                element={
                  <ProtectedRoute>
                    <SocialMedia />
                  </ProtectedRoute>
                }
              />
              <Route
                path="admin/social_media/edit"
                element={
                  <ProtectedRoute>
                    <SocialMediaEdit />
                  </ProtectedRoute>
                }
              />
              <Route
                path="admin/setting/banner"
                element={
                  <ProtectedRoute>
                    <BannerTable />
                  </ProtectedRoute>
                }
              />
              <Route
                path="admin/banner/edit"
                element={
                  <ProtectedRoute>
                    <BannerEdit />
                  </ProtectedRoute>
                }
              />
              <Route
                path="admin/setting/about"
                element={
                  <ProtectedRoute>
                    <AboutAdmin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="admin/about/edit"
                element={
                  <ProtectedRoute>
                    <AboutEdit />
                  </ProtectedRoute>
                }
              />
              <Route
                path="admin/setting/services"
                element={
                  <ProtectedRoute>
                    <ServicesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="admin/service/edit"
                element={
                  <ProtectedRoute>
                    <ServiceEdit />
                  </ProtectedRoute>
                }
              />
              <Route
                path="admin/setting/projects"
                element={
                  <ProtectedRoute>
                    <ProjectsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="admin/project/edit"
                element={
                  <ProtectedRoute>
                    <ProjectEditPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="admin/setting/ourTeam"
                element={
                  <ProtectedRoute>
                    <OurTeamPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="admin/ourTeam/edit"
                element={
                  <ProtectedRoute>
                    <OurTeamEdit />
                  </ProtectedRoute>
                }
              />
              <Route
                path="admin/setting/Contact-data"
                element={
                  <ProtectedRoute>
                    <ContactData />
                  </ProtectedRoute>
                }
              />
              <Route
                path="admin/setting/Contact-form"
                element={
                  <ProtectedRoute>
                    <ContactForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="admin/setting/footer"
                element={
                  <ProtectedRoute>
                    <FooterData />
                  </ProtectedRoute>
                }
              />
              <Route
                path="admin/setting/billing"
                element={
                  <ProtectedRoute>
                    <BillingData />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/apply-form-data"
                element={
                  <ProtectedRoute>
                    <ApplyFormData />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/become-partner"
                element={
                  <ProtectedRoute>
                    <BecomePartnerForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/loanProduct"
                element={
                  <ProtectedRoute>
                    <LoanServicesPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/loanProduct/edit"
                element={
                  <ProtectedRoute>
                    <LoanDataEdit />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/partner"
                element={
                  <ProtectedRoute>
                    <PartnerPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/partner/edit"
                element={
                  <ProtectedRoute>
                    <EditPartnerPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/paymentRequest"
                element={
                  <ProtectedRoute>
                    <PaymentRequestPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/httpLinkData"
                element={
                  <ProtectedRoute>
                    <LinkWithHttpDataTable />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/viewDelarData"
                element={
                  <ProtectedRoute>
                    <ViewDelarPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/addDelarData"
                element={
                  <ProtectedRoute>
                    <AddDelarPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/editDelarData"
                element={
                  <ProtectedRoute>
                    <EditDelarPage />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </Router>
      </AuthProviderUser>
    </AuthProvider>
  );
}

export default App;
