import Link from "next/link";
import { QrCode } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40">
       <div className="absolute top-8 left-8">
        <Link href="/" className="flex items-center gap-2 text-foreground">
          <QrCode className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">MenyQR</span>
        </Link>
      </div>
      {children}
    </div>
  );
}
