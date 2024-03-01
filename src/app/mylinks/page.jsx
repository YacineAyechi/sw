import PrivateRoute from "@/auth/PrivateRoute";
import Created from "@/components/Created/Created";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";

const Links = () => {
  return (
    <PrivateRoute>
      {/* <Navbar /> */}
      <div className="flex">
        <Sidebar fixed={true} /> {/* Pass fixed prop */}
        <Created />
      </div>
    </PrivateRoute>
  );
};

export default Links;
