"use client";
import LoginForm from "@/components/auth/LoginForm";
import LoadingUser from "@/components/LoadingUser";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Import useRouter
import { useEffect } from "react";

const Login = () => {
  const { data: session, status } = useSession(); // TypeScript automatically infers the types here
  const router = useRouter(); // Use the router for redirection

  useEffect(() => {
    if (status === "authenticated") {
      // Redirect if authenticated
      router.push("/dashboard/home/overview");
    }
  }, [status, router]); // Dependency array for effect

  if (status === "loading") {
    return <LoadingUser />;
  }

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-blue-900"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Inventory System
        </a>
        <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-blue-900 md:text-2xl">
              Sign in to your account
            </h1>
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
