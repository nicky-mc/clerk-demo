"use client"; // This component is rendered on the client

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link"; // For navigation

export default function AuthHeader({ userId }) {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white font-bold text-xl">
          <Link href="/">My Fancy App</Link>
        </h1>
        <nav className="flex space-x-4">
          <Link
            href="/posts"
            className="text-white font-semibold hover:text-gray-200"
          >
            Posts
          </Link>

          {/* Use Clerk client-side components */}
          {userId ? (
            <SignedIn>
              <UserButton />
            </SignedIn>
          ) : (
            <SignedOut>
              <SignInButton mode="modal" className="btn btn-outline btn-info">
                Sign In
              </SignInButton>
              <SignUpButton className="btn btn-outline btn-success ml-2">
                Sign Up
              </SignUpButton>
            </SignedOut>
          )}
        </nav>
      </div>
    </header>
  );
}
