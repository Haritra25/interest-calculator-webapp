import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Homepage from "./pages/Homepage";
import Accounts from "./pages/Accounts";
import Payments from "./pages/Payments";
import Portfolio from "./pages/Portfolio";
import AddTransaction from "./pages/AddTransaction";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import InterestCalculatorPanel from "./components/InterestCalculatorPanel";
import Investors from "./pages/Investors";
import AddInvestor from "./pages/AddInvestor";

function isAuthenticated() {
  return !!localStorage.getItem("token");
}

function PrivateRoute() {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
}
function AnonymousRoute() {
  return isAuthenticated() ? <Navigate to="/homepage" replace /> : <Outlet />;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Always send root to login (not homepage) */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        {/* Anonymous-only: login/register */}
        <Route element={<AnonymousRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        {/* Private/protected routes - ONLY accessible if logged in (token present) */}
        <Route element={<PrivateRoute />}>
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/addtransaction" element={<AddTransaction />} />
          <Route path="/investors" element={<Investors />} />
          <Route path="/add-investor" element={<AddInvestor />} />
          <Route
            path="/interest-calculator"
            element={<InterestCalculatorPanel />}
          />
        </Route>
        {/* Optional: catch all unmatched routes and go to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
