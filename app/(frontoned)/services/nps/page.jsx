import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import InnerBanner from "@/components/InnerBanner/InnerBanner";
import {
  FaRegMoneyBillAlt,
  FaPiggyBank,
  FaChartPie,
  FaShieldAlt,
  FaUserCheck,
} from "react-icons/fa";
import TypesServices from "@/components/OurBuisnnessModel/typesServices";

export const metadata = {
  title: "National Pension System (NPS)",
  description:
    "Plan your retirement with the National Pension System. Enjoy tax benefits, long-term wealth creation, and secure your financial future.",
};

const npsFeatures = [
  {
    icon: <FaShieldAlt className="text-3xl text-primary" />,
    title: "Retirement Security",
    description:
      "Build a long-term retirement corpus with disciplined and structured contributions.",
  },
  {
    icon: <FaRegMoneyBillAlt className="text-3xl text-primary" />,
    title: "Tax Benefits",
    description:
      "Avail tax deductions under Section 80CCD(1B) for up to ₹50,000 in addition to 80C.",
  },
  {
    icon: <FaChartPie className="text-3xl text-primary" />,
    title: "Asset Diversification",
    description:
      "Invest in a balanced mix of equity, corporate bonds, and government securities.",
  },
  {
    icon: <FaPiggyBank className="text-3xl text-primary" />,
    title: "Cost-Effective Investment",
    description:
      "One of the lowest-cost retirement savings plans regulated by PFRDA.",
  },
  {
    icon: <FaUserCheck className="text-3xl text-primary" />,
    title: "Flexible & Transparent",
    description:
      "Choose fund managers, contribution amount, and change asset allocation anytime.",
  },
];

const NPS = () => {
  return (
    <div>
      {/* Banner */}
      <InnerBanner pageName="National Pension System (NPS)" />

      <div className="max-w-screen-xl mx-auto main_section1">
        {/* Introduction */}
        <div className="mb-8 flex flex-col md:flex-row items-center md:items-start">
          <div className="md:w-1/2">
            <p className="text-lg text-gray-300 text-justify">
              The National Pension System (NPS) is a government-backed retirement savings scheme that helps you build a financially secure future. It’s designed for long-term wealth creation with a mix of equity, corporate bonds, and government securities.
            </p>
            <p className="text-lg text-gray-300 mt-2 text-justify">
              With flexible contribution options, low charges, and tax-saving benefits, NPS is an ideal tool for individuals looking to plan for retirement while enjoying the power of compounding returns.
            </p>
          </div>
          <div className="md:w-1/2 md:pl-8 flex justify-center mt-6 md:mt-0">
            <Image
              src="/Services/pms-2.jpg"
              alt="NPS Investment"
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
          Why Choose{" "}
          <span className="text-[var(--rv-secondary)]">NPS?</span>
        </h2>
        <TypesServices serviceTypes={npsFeatures} />
      </div>

      {/* CTA Section */}
      <div className="max-w-screen-xl mx-auto main_section">
        <div className="text-center mt-8">
          <p className="text-lg text-gray-300 mb-4">
            Start securing your retirement today with NPS. Take advantage of tax benefits and build a reliable retirement corpus with expert guidance.
          </p>
          <Link href="/contactus" className="text-[var(--rv-white)]">
            <Button className="bg-[var(--secondary)] text-[var(--rv-white)] rounded-2xl px-8 text-xl cursor-pointer">
              Start Your <br /> NPS Investment Today
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NPS;
