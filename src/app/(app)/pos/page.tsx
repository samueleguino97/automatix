import { dbClient } from "@/db";
import React from "react";

async function POSPage() {
  const result = await dbClient.querySingle("select 2 + 2;");
  console.log(result);
  return <div>POSPage</div>;
}

export default POSPage;
