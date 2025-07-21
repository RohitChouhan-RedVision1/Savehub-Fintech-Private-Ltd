// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import Image from "next/image";
// import React from "react";
// import InnerBanner from "@/components/InnerBanner/InnerBanner";
// import {
//   FaFileInvoiceDollar,
//   FaChartBar,
//   FaUniversity,
//   FaFileContract,
//   FaLightbulb,
// } from "react-icons/fa";
// import TypesServices from "@/components/OurBuisnnessModel/typesServices";
// import TopTaxSavingFunds from "@/components/MutalfundSection/TopPerformanceFund/page"; // Optional placeholder

// const taxPlanningFeatures = [
//   {
//     icon: <FaFileInvoiceDollar className="text-3xl text-primary" />,
//     title: "Save Taxes Legally",
//     description:
//       "Leverage government-approved deductions under sections like 80C, 80D, and more.",
//   },
//   {
//     icon: <FaChartBar className="text-3xl text-primary" />,
//     title: "Maximize Income",
//     description:
//       "Retain more of your earnings by minimizing tax liability with smart financial structuring.",
//   },
//   {
//     icon: <FaUniversity className="text-3xl text-primary" />,
//     title: "Plan for Life Goals",
//     description:
//       "Invest in tax-saving instruments that also help you reach goals like retirement, education, or housing.",
//   },
//   {
//     icon: <FaFileContract className="text-3xl text-primary" />,
//     title: "Compliance & Filing",
//     description:
//       "Avoid penalties with accurate tax return filing and adherence to latest regulations.",
//   },
//   {
//     icon: <FaLightbulb className="text-3xl text-primary" />,
//     title: "Expert Guidance",
//     description:
//       "Get customized advice based on your profession, income, and investment profile.",
//   },
// ];

// export const metadata = {
//   title: "Tax Planning Services",
//   description:
//     "Optimize your taxes and increase your savings with expert tax planning strategies tailored to your financial profile.",
// };

// const TaxPlanning = () => {
//   return (
//     <div>
//       {/* Banner */}
//       <InnerBanner pageName={"Tax Planning"} />

//       {/* Intro Section */}
//       <div className="max-w-screen-xl mx-auto main_section1">
//         <div className="mb-8 flex flex-col md:flex-row items-center md:items-start">
//           <div className="md:w-1/2">
//             <p className="text-lg text-gray-300 text-justify">
//               Tax planning is a vital part of personal financial management that
//               ensures you pay the minimum legal amount of taxes while staying
//               compliant. Strategic tax planning not only saves money but also
//               helps you plan better for the future through smart investment
//               choices.
//             </p>
//             <p className="text-lg text-gray-300 mt-2 text-justify">
//               With expert assistance, you can take advantage of all eligible
//               deductions, exemptions, and rebates. Whether you're a salaried
//               individual, business owner, or professional, our tax planning
//               services will help you maximize income, reduce liabilities, and
//               meet long-term goals efficiently.
//             </p>
//           </div>
//           <div className="md:w-1/2 md:pl-8 flex justify-center mt-6 md:mt-0">
//             <Image
//               src="/Services/tax-planning-1.jpg"
//               alt="Tax Planning"
//               width={500}
//               height={300}
//               className="rounded-lg shadow-lg"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Features */}
//       <div className="max-w-screen-xl mx-auto main_section1">
//         <h2 className="text-4xl text-[var(--rv-white)] text-center font-bold mb-4">
//           Benefits of <span className="text-[var(--rv-secondary)]">Tax Planning</span>
//         </h2>

//         <TypesServices serviceTypes={taxPlanningFeatures} />
//       </div>

//       {/* Tax Saving Investments Section */}
//       <div className="max-w-screen-xl mx-auto main_section1">
//         <h2 className="text-4xl text-[var(--rv-white)] text-center font-bold mb-4">
//           Top <span className="text-[var(--rv-secondary)]">Tax Saving</span> Instruments
//         </h2>

//         <TopTaxSavingFunds /> {/* Optional: Replace with ELSS/NPS/PPF/ULIP details */}
//       </div>

//       {/* Call To Action */}
//       <div className="max-w-screen-xl mx-auto main_section">
//         <div className="text-center mt-8">
//           <p className="text-lg text-gray-300 mb-4">
//             Start optimizing your taxes today and unlock long-term savings.
//             Connect with our financial experts for a personalized tax plan.
//           </p>
//           <Link href="/contactus" className="text-[var(--rv-white)]">
//             <Button className="bg-[var(--secondary)] text-[var(--rv-white)] rounded-2xl px-8 text-xl cursor-pointer">
//               Talk to Our <br /> Tax Planning Expert
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TaxPlanning;
