import { Outlet } from "react-router-dom";
import Header from "../components/Ui/Header";
import TopNavigationBar from "../components/Ui/TopNavigationBar";
import Footer from "../components/Ui/Footer";

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <TopNavigationBar />
      <div className="mb-20 p-9">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
