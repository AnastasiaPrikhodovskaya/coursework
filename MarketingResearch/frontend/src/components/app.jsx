import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import GuestHome from './Homes/GuestHome/guestHome';
import Login from './Login/login';
import RegisterUser from './Register/registerUser';
import NotFound from './Exceptions/notFound';
import Header from './Shared/Header/header';
import Footer from './Shared/Footer/footer';
import RegisterCompany from './Register/registerCompany';
import CompanyHome from './Homes/CompanyHome/companyHome';
import UserHome from './Homes/UserHome/userHome';
import Orders from './Dashboards/CompanyDashboardElements/Orders/orders';
import Profile from './Dashboards/CompanyDashboardElements/Profile/profile';
import Statistics from './Dashboards/CompanyDashboardElements/Statistics/statistics';
import UserProfile from './Dashboards/UserDashboardElements/Profile/profile';
import Polls from './Dashboards/UserDashboardElements/Polls/polls';

function App() {
  const auth = useSelector((state) => state.auth);

  return (
    <>
      {!auth.isAuthUser && !auth.isAuthCompany && (
        <>
          <Header />
          <Routes>
            <Route exact path='/' element={<GuestHome />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register_user' element={<RegisterUser />} />
            <Route
              exact
              path='/register_company'
              element={<RegisterCompany />}
            />
            <Route exact path='*' element={<NotFound />} />
          </Routes>
          <Footer />
        </>
      )}
      {(auth.isAuthUser || auth.isAuthCompany) && (
        <Routes>
          {auth.isAuthUser ? (
            <>
              <Route exact path='/' element={<UserHome />} />
              <Route exact path='/profile' element={<UserProfile />} />
              <Route exact path='/polls' element={<Polls />} />
            </>
          ) : (
            <>
              <Route exact path='/' element={<CompanyHome />} />

              <Route exact path='/profile' element={<Profile />} />
              <Route exact path='/orders' element={<Orders />} />
              <Route exact path='/statistics' element={<Statistics />} />
            </>
          )}

          <Route exact path='/' element={<GuestHome />} />
          <Route exact path='*' element={<NotFound />} />
          <Route exact path='/login' element={<Navigate to='/' replace />} />
          <Route
            exact
            path='/register_user'
            element={<Navigate to='/' replace />}
          />
          <Route
            exact
            path='/register_company'
            element={<Navigate to='/' replace />}
          />
        </Routes>
      )}
    </>
  );
}

export default App;
