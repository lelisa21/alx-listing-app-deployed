import React, {ReactNode} from "react";
import Header from "./Header";
import Footer from "./Footer";
import { AuthProvider } from "../auth/AuthContext";
interface LayoutProps {
  children: ReactNode;
  onSearch: (data: { location: string; checkIn: string; checkOut: string; guests: number }) => void; 
}
const Layout: React.FC<LayoutProps> = ({children , onSearch}) => {
  return (
    <>
      <AuthProvider>
        <Header onSearch={onSearch} />
      </AuthProvider>
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
