import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import PrivateRoute from "./Layout/PrivateRoute";
import Dashboard from "./Layout/Main";
import DashboardUser from "./components/Dashboard/DashboardUser";
import { ChatUser } from "./components/Dashboard/ChatUser";
import { Profile } from "./components/Dashboard/Profile";
import Demo from "./components/Demo";
import ChatPage from "./components/Dashboard/ChatPage";
import Settings from "./components/Ui/Settings";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/chat/:userId" element={<ChatPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<DashboardUser />} />
              <Route path="profile/:id" element={<Profile />} />
              <Route path="chat/:userId" element={<ChatUser />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <div>{/* <RouterProvider router={router}></RouterProvider> */}</div>
    </>
  );
}

export default App;
