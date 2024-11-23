import AdminSidebar from "@/components/AdminSidebar";

function Layout({ children }) {
  return (
    <div className="flex">
      <div className="">
        <AdminSidebar />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

export default Layout;
