import PrivateRoute from "@/auth/PrivateRoute";
import About from "@/components/About/About";
import Sidebar from "@/components/Sidebar/Sidebar";

export const metadata = {
  title: "SwiftLink | About Us ",
  description: "...",
};

const Contact = () => {
  return (
    <PrivateRoute>
      <title>{title}</title>
      <div className="flex">
        <Sidebar />
        <About />
      </div>
    </PrivateRoute>
  );
};

export default Contact;
