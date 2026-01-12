import "./globals.css";
import ClientLayout from "@/client-layout";
import TopBar from "@/components/TopBar/TopBar";

export const metadata = {
  title: "BCP | Building Construction Professionals Corp - Greater Boston Construction & Remodeling",
  description: "Family-owned construction and remodeling company serving Greater Boston, North Shore, and South Shore. 25+ years experience in kitchen & bathroom remodels, ADUs, finished basements, and custom decks. Licensed & insured MA HIC #183522, CSL #CS-096174.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>
          <TopBar />
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
