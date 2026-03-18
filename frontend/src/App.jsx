import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import SignUp from "./pages/SignUp";
import BlogSavings from "./pages/BlogSavings";
import BlogCredit from "./pages/BlogCredit";
import { ServiceSavings, ServiceBusiness, ServiceCards, ServiceInsurance, ServiceWealth, ServiceInternational } from "./pages/ServicePages";
import Accounts from "./pages/Accounts";
import About from "./pages/About";
import Insights from "./pages/Insights";
import Database from "./pages/Database";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/services"
          element={
            <PrivateRoute>
              <Services />
            </PrivateRoute>
          }
        />
        <Route
          path="/services/savings"
          element={
            <PrivateRoute>
              <ServiceSavings />
            </PrivateRoute>
          }
        />
        <Route
          path="/services/business"
          element={
            <PrivateRoute>
              <ServiceBusiness />
            </PrivateRoute>
          }
        />
        <Route
          path="/services/cards"
          element={
            <PrivateRoute>
              <ServiceCards />
            </PrivateRoute>
          }
        />
        <Route
          path="/services/insurance"
          element={
            <PrivateRoute>
              <ServiceInsurance />
            </PrivateRoute>
          }
        />
        <Route
          path="/services/wealth"
          element={
            <PrivateRoute>
              <ServiceWealth />
            </PrivateRoute>
          }
        />
        <Route
          path="/services/international"
          element={
            <PrivateRoute>
              <ServiceInternational />
            </PrivateRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <PrivateRoute>
              <Contact />
            </PrivateRoute>
          }
        />
        <Route
          path="/blog"
          element={
            <PrivateRoute>
              <Blog />
            </PrivateRoute>
          }
        />
        <Route
          path="/blog/savings"
          element={
            <PrivateRoute>
              <BlogSavings />
            </PrivateRoute>
          }
        />
        <Route
          path="/blog/credit-score"
          element={
            <PrivateRoute>
              <BlogCredit />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/accounts"
          element={
            <PrivateRoute>
              <Accounts />
            </PrivateRoute>
          }
        />
        <Route
          path="/about"
          element={
            <PrivateRoute>
              <About />
            </PrivateRoute>
          }
        />
        <Route
          path="/insights"
          element={
            <PrivateRoute>
              <Insights />
            </PrivateRoute>
          }
        />
        <Route path="/database" element={<Database />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
