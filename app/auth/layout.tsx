import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <main className="w-full">{children}</main>
      <Footer />
    </div>
  );
}
