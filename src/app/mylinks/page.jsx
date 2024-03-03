import PrivateRoute from "@/auth/PrivateRoute";
import Created from "@/components/Created/Created";
import Sidebar from "@/components/Sidebar/Sidebar";

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
