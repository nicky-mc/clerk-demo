import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <>
      <h1>Sign In to the most sparkly page of all!</h1>
      <SignIn />
    </>
  );
}
