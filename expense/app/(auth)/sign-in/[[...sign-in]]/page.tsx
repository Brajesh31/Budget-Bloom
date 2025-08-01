import { SignIn } from "@clerk/nextjs";
import Image from 'next/image';
import img from "../../../../public/signup.jpg";
import Link from "next/link";

export default function Page() {
  return (
    <section className="relative">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={img}
          alt="Expense Tracker"
          fill
          quality={100}
          priority
          className="object-cover"
          loading="eager"
          style={{ filter: "blur(8px)", objectFit: "cover" }}
          placeholder="blur"
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gray-900/75 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

      {/* Content */}
      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
            Take control of your
            <strong className="block font-extrabold text-rose-500"> Finances. </strong>
          </h1>

          <p className="mt-4 max-w-lg text-white sm:text-xl/relaxed">
            Track your expenses, set budgets, and gain financial freedom with our smart budget bloom. Start managing your money better today!
          </p>

          {/* Button */}
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-start gap-4 text-center">
            <Link
              href="/"
              className="w-full sm:w-auto rounded-sm bg-rose-600 px-6 sm:px-12 py-3 text-sm font-medium text-white shadow-sm hover:bg-black focus:ring-3 focus:outline-none"
            >
              View Home Budget Bloom
            </Link>
          </div>
        </div>

        {/* Sign In */}
        <div className="mt-20 sm:mt-0 sm:ml-40 flex justify-center sm:justify-end">
          <div className="w-full sm:w-auto bg-white/10 backdrop-blur-md p-1 rounded-lg">
            <SignIn routing="hash" />
          </div>
        </div>
      </div>
    </section>
  );
}
