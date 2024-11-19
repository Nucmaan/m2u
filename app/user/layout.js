import Sidebar from '@/components/Sidebar';
function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#F7F7F9]">
      <Sidebar />
      <div className="flex-1 p-6">
        {children}
      </div>
    </div>
  );
}

export default Layout;
