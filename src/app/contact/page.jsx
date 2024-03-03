import PrivateRoute from "@/auth/PrivateRoute";
import ContactForm from "@/components/ContactForm/ContactForm";
import Sidebar from "@/components/Sidebar/Sidebar";

export const metadata = {
  title: "SwiftLink | Contact Us ",
  description: "...",
};

const Contact = () => {
  return (
    <PrivateRoute>
      <div className="flex">
        <Sidebar />
        <ContactForm />
      </div>
    </PrivateRoute>
  );
};

export default Contact;
