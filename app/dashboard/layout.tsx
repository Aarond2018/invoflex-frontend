import DBLayout from "@/components/dashboard/DBLayout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DBLayout>
      { children }
    </DBLayout>
  );
}
