import { redirect } from "next/navigation";
import React from "react";

function SettingsRedirect() {
  redirect("/settings/me");
}

export default SettingsRedirect;
