import TabNav from "@/components/tab-nav";
import React from "react";

function TabLayout({ children }: { children: React.ReactNode }) {
  return <TabNav>{children}</TabNav>;
}

export default TabLayout;
