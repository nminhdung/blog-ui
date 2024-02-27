import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DashPosts from "../components/DashPosts";
import DashProfile from "../components/DashProfile";
import DashSidebar from "../components/DashSidebar";
import DashUsers from "../components/DashUsers";
import DashboardComp from "./DashboardComp";


const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search])
  return (
    <div className='h-full flex flex-col md:flex-row mb-[200px] gap-4'>
      <div>
        <DashSidebar tab={tab} />
      </div>
     <div className='flex-1 p-4'>
        {tab === 'profile' && <DashProfile />}
        {tab === 'posts' && <DashPosts />}
        {tab === 'users' && <DashUsers />}
        {tab === 'dash' && <DashboardComp />}
     </div>
    </div>
  );
};

export default Dashboard;