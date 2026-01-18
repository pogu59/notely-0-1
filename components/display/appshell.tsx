import { ReactNode } from "react";
import { clsx as cn } from "clsx";

export default function AppShell({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto py-10 h-full justify-center", className)}>
      {children}
    </div>
  );
}
