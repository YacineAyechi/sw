import PrivateRoute from "@/auth/PrivateRoute";
import HomePage from "@/components/HomePage/HomePage";
import Sidebar from "@/components/Sidebar/Sidebar";

export const metadata = {
  title: "SwiftLink | Home ",
  description: "...",
};

export default function Home() {
  return (
    <PrivateRoute>
      <div className="flex">
        <Sidebar />
        <HomePage />
      </div>
    </PrivateRoute>
  );
}
