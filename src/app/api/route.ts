import { NextRequestWithSession } from "../../middleware";

export async function GET(request: NextRequestWithSession) {
  console.log(request);
  return new Response("TE AMO MI AMOR");
}
