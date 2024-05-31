import Header from "@/components/header/Header"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Header />
 
      {children}
    </div>
  )
}