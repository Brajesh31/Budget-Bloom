import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
import img from "../../../../public/signup.jpg";
import Link from "next/link";

export default function Page() {
  return (
    <section className="relative min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={img}
          alt="Expense Tracker Background"
          fill
          quality={100}
          priority
          className="object-cover blur-sm"
          placeholder="blur"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 -z-10 bg-gray-900/70"></div>

      {/* Content */}
      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:justify-between lg:px-8">

        {/* Left Side Content */}
        <div className="max-w-xl text-center lg:text-left">
          <h1 className="text-4xl font-extrabold text-white sm:text-6xl">
            Take control of your
            <strong className="block font-extrabold text-rose-500"> Finances. </strong>
          </h1>

          <p className="mt-4 max-w-lg text-white sm:text-xl">
            Track your expenses, set budgets, and gain financial freedom with our smart budget bloom. Start managing your money better today!
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-center">
            <Link
              href="/sign-in"
              className="block w-full sm:w-auto rounded-md bg-rose-600 px-10 py-3 text-sm font-semibold text-white shadow-lg hover:bg-black focus:ring-4 focus:ring-rose-500 transition"
            >
              Login with Budget Bloom
            </Link>
          </div>
        </div>

        {/* Right Side: SignUp Form */}
        <div className="mt-12 lg:mt-0 lg:w-1/2 flex justify-center">
          <div className="rounded-2xl bg-white/10 backdrop-blur-md p-1 shadow-xl max-w-md">
            <SignUp routing="hash" />
          </div>
        </div>

      </div>
    </section>
  );
}
