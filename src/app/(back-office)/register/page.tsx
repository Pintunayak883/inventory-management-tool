"use client";
import RegisterForm from "@/components/auth/RegisterForm";
import LoadingUser from "@/components/LoadingUser";
import { useSession, Session } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Register = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false); // Explicitly typing the state as a boolean

  useEffect(() => {
    if (status === "loading") {
      setIsLoading(true); // Set loading state to true while loading
    } else if (status === "authenticated") {
      router.push("/dashboard/home/overview");
    } else {
      setIsLoading(false); // Once done with loading or if unauthenticated, stop loading
    }
  }, [status, router]);

  if (isLoading) {
    return <LoadingUser />; // Show LoadingUser component while status is loading
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
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-blue-900 md:text-2xl">
              Create a new account
            </h1>
            <RegisterForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
