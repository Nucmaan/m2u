import Sidebar from "@/components/Sidebar";

function Layout({ children }) {
  return (
    <div className="flex">
      <div className="">
        <Sidebar />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

export default Layout;
