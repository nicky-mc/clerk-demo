import { auth } from "@clerk/nextjs/server";
import AuthHeader from "./AuthHeader"; // The client-side component

export default async function HeaderWrapper() {
  const { userId } = auth(); // This is server-side, safely using auth()

  return <AuthHeader userId={userId} />; // Pass userId to the client component
}
