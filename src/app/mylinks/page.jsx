import PrivateRoute from "@/auth/PrivateRoute";
import Created from "@/components/Created/Created";
import Sidebar from "@/components/Sidebar/Sidebar";

export const metadata = {
  title: "SwiftLink | My Links ",
  description: "...",
};

const Links = () => {
  return (
    <PrivateRoute>
      <div className="flex">
        <Sidebar fixed={true} /> {/* Pass fixed prop */}
        <Created />
      </div>
    </PrivateRoute>
  );
};

export default Links;
