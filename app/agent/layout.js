import AgentSidebar from "@/components/AgentSidebar";

function Layout({ children }) {
  return (
    <div className="flex">
      <div className="">
        <AgentSidebar />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

export default Layout;
