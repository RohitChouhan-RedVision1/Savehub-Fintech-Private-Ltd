import React from 'react'

import {  FaLaptopCode, FaChalkboardTeacher, FaRegEnvelope } from "react-icons/fa";
import { HiRefresh } from "react-icons/hi";

import { FaHandshake, FaUsers } from 'react-icons/fa6';
import TypesServices from './typesServices';
;

const BusinessModel  = () => {
    const fundTypes = [
  {
    icon: <FaRegEnvelope className="text-3xl text-primary" />,
    title: "Bilingual Accessibility",
    description: "By providing services in both English and Hindi, the SaveHub-Robo app removes language barriers that could hinder financial empowerment.",
  },
  {
    icon: <FaUsers className="text-3xl text-primary" />,
    title: "Household and Socio-Economic Focus",
    description: "Customized tools designed for families and underserved communities promote inclusive wealth creation aligned with India’s socio-economic objectives.",
  },
  {
    icon: <FaLaptopCode className="text-3xl text-primary" />,
    title: "AI-Powered Innovation",
    description: "Utilizing advanced AI and machine learning technologies, the platform delivers personalized, cost-effective, and transparent investment advisory services.",
  },
  {
    icon: <FaHandshake className="text-3xl text-primary" />,
    title: "B2B Ecosystem",
    description: "Strategic partnerships with financial institutions and advisors extend our reach, creating a scalable network for investment distribution.",
  },
  {
    icon: <FaChalkboardTeacher className="text-3xl text-primary" />,
    title: "Commitment to Financial Literacy",
    description: "Our emphasis on investor education empowers users to confidently navigate the complexities of investing.",
  },
  {
    icon: <HiRefresh className="text-3xl text-primary" />,
    title: "Trusted and Secure",
    description: "Robust cybersecurity protocols and transparent operations foster trust among retail and institutional clients alike.",
  },
];

  return (
    <div>
       <div className="bg-[var(--rv-ternary)]">
      <div className="max-w-screen-xl mx-auto  main_section">
         <h2 className="text-4xl font-bold mb-6 text-[var(--rv-white)] items-center text-center" initial={{ x: -100, opacity: 0 }}
          // animate={isInView ? { x: 0, opacity: 1 } : {}}
          // transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Why <span className="text-[var(--rv-secondary)]">SaveHub Fintech </span> Stands Out
          </h2>

          {/* <p
              className="text-[var(--rv-white)]/80 text-center  leading-relaxed mb-6"
            //   initial={{ x: 20, opacity: 0 }}
            //   whileInView={{ x: 0, opacity: 1 }}
            //   transition={{ delay: 0.5, duration: 0.5 }}
            //   viewport={{ once: true }}
            >
         At SaveHub  Pvt. Ltd, we blend traditional wisdom with modern technology to provide smart, seamless, and adaptable financial solutions.

            </p> */}

            <TypesServices serviceTypes={fundTypes} />
      </div>
    </div>
    </div>
  )
}

export default BusinessModel;