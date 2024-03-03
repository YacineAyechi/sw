import PrivateRoute from "@/auth/PrivateRoute";
import About from "@/components/About/About";
import Sidebar from "@/components/Sidebar/Sidebar";

const Contact = () => {
  return (
    <PrivateRoute>
      <title>SwiftLink | About Us</title>
      <div className="flex">
        <Sidebar />
        <About />
      </div>
    </PrivateRoute>
  );
};

export default Contact;
