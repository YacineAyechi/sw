import PrivateRoute from "@/auth/PrivateRoute";
import ContactForm from "@/components/ContactForm/ContactForm";
import Sidebar from "@/components/Sidebar/Sidebar";

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
