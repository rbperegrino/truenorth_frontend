import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Auth from "./_auth/Auth";
import Login from "./_auth/_login/Login";
import ProtectedRoute from "./_util/ProtectedRoute";
import UserRecords from "./_portal/_user_records/UserRecords";
import NewOperation from "./_portal/_new_operation/NewOperation";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

      <BrowserRouter basename={'/'}>
          <Routes>
              <Route path='/auth' element={<Auth />}>
                  <Route path='login' element={<Login />} />
              </Route>
              <Route path="/" element={<App />}>
                  <Route path='' element={
                      <ProtectedRoute>
                          <UserRecords />
                      </ProtectedRoute>
                  } />

                  <Route path='new' element={
                      <ProtectedRoute>
                          <NewOperation />
                      </ProtectedRoute>
                  } />
              </Route>
          </Routes>
      </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
