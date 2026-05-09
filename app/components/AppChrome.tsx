"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { CamoWrapper } from "./CamoWrapper";
import { LayoutOverlays } from "./LayoutOverlays";
import { SmoothScrollProvider } from "./SmoothScrollProvider";

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isResume = pathname === "/resume" || pathname === "/resume/";
  const isSupport = pathname === "/support" || pathname === "/support/";
  const isProject = pathname.startsWith("/projects/");
  const isStandalone = isResume || isSupport || isProject;

  useEffect(() => {
    document.documentElement.classList.toggle("standalone-document", isStandalone);
    document.body.classList.toggle("standalone-document", isStandalone);

    return () => {
      document.documentElement.classList.remove("standalone-document");
      document.body.classList.remove("standalone-document");
    };
  }, [isStandalone]);

  if (isStandalone) {
    return <>{children}</>;
  }

  return (
    <SmoothScrollProvider overlays={<LayoutOverlays />}>
      <CamoWrapper>{children}</CamoWrapper>
    </SmoothScrollProvider>
  );
}
