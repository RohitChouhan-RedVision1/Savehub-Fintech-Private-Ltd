import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import InnerBanner from "@/components/InnerBanner/InnerBanner";
import {
  FaHandHoldingUsd,
  FaShieldAlt,
  FaChartLine,
  FaLandmark,
  FaClock,
} from "react-icons/fa";
import TypesServices from "@/components/OurBuisnnessModel/typesServices";

export const metadata = {
  title: "Fixed Deposits & Bond Investment Services",
  description:
    "Explore secure and predictable investment options with Fixed Deposits and Bonds, offering capital protection and steady income.",
};

const features = [
  {
    icon: <FaShieldAlt className="text-3xl text-primary" />,
    title: "Capital Safety",
    description:
      "Both FDs and Bonds provide capital protection, ideal for conservative and risk-averse investors.",
  },
  {
    icon: <FaChartLine className="text-3xl text-primary" />,
    title: "Predictable Returns",
    description:
      "Enjoy steady interest payouts and fixed maturity value with clear timelines and rates.",
  },
  {
    icon: <FaHandHoldingUsd className="text-3xl text-primary" />,
    title: "Flexible Choices",
    description:
      "Choose from Bank/Corporate FDs, Government Bonds, PSU Bonds, and Tax-Free Bonds to match your needs.",
  },
  {
    icon: <FaLandmark className="text-3xl text-primary" />,
    title: "Tax Efficiency Options",
    description:
      "Access Tax-Free Bonds or 54EC Capital Gain Bonds for tax-saving opportunities.",
  },
  {
    icon: <FaClock className="text-3xl text-primary" />,
    title: "Defined Tenure",
    description:
      "Plan your financial goals with investment options ranging from 1 year to 10+ years.",
  },
];

const FdAndBonds = () => {
  return (
    <div>
      {/* Banner */}
      <InnerBanner pageName="Fixed Deposits & Bond Investment Services" />

      <div className="max-w-screen-xl mx-auto main_section1">
        {/* Introduction */}
        <div className="mb-8 flex flex-col md:flex-row items-center md:items-start">
          <div className="md:w-1/2">
            <p className="text-lg text-gray-300 text-justify">
              Fixed Deposits (FDs) and Bonds are reliable, fixed-income investment instruments that offer safety, stability, and predictable returns. Ideal for conservative investors, they help preserve capital while generating steady income over a fixed tenure.
            </p>
            <p className="text-lg text-gray-300 mt-2 text-justify">
              From bank FDs and corporate deposits to government and tax-free bonds, these options cater to varying financial goals and time horizons. Whether you're planning for retirement or diversifying your portfolio, FDs and Bonds can play a vital role.
            </p>
          </div>
          <div className="md:w-1/2 md:pl-8 flex justify-center mt-6 md:mt-0">
            <Image
              src="/Services/Bonds-NCDs-2.jpg"
              alt="FD and Bond Investment"
              width={500}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-screen-xl mx-auto main_section1">
        <h2 className="text-4xl text-[var(--rv-white)] text-center font-bold mb-4">
          Why Invest in{" "}
          <span className="text-[var(--rv-secondary)]">FDs & Bonds?</span>
        </h2>
        <TypesServices serviceTypes={features} />
      </div>

      {/* CTA Section */}
      <div className="max-w-screen-xl mx-auto main_section">
        <div className="text-center mt-8">
          <p className="text-lg text-gray-300 mb-4">
            Looking for low-risk, predictable income options? Fixed Deposits and Bonds could be the right fit. Connect with us to explore the best available options today.
          </p>
          <Link href="/contactus" className="text-[var(--rv-white)]">
            <Button className="bg-[var(--secondary)] text-[var(--rv-white)] rounded-2xl px-8 text-xl cursor-pointer">
              Invest in FDs & Bonds <br /> Secure Your Financial Future
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FdAndBonds;
