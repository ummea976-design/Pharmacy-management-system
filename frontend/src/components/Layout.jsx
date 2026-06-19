import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark font-sans text-text-main-light dark:text-text-main-dark antialiased transition-colors duration-200">
            <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
            <main className={`flex-1 h-full overflow-y-auto bg-background-light dark:bg-background-dark p-6 lg:p-8 transition-all duration-200 ${isSidebarCollapsed ? 'ml-0 md:ml-20' : 'ml-0 md:ml-64'}`}>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
