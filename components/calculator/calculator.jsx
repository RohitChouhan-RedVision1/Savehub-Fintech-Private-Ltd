"use client";
import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { FaFilePdf } from "react-icons/fa6";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { footerData } from "@/data/footer";
import Image from "next/image";
// import SectionHeading from "./sectionHeading";
import { SipHomeChart } from "@/components/charts/sipHomeChart";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Calculator({ siteData }) {
  const mainCounterRef = useRef(null);
  const isInView = useInView(mainCounterRef, { once: true, threshold: 0.3 });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMonthlySip, setIsMonthlySip] = useState(true);
  const [oneTimeInvestment, setOneTimeInvestment] = useState(500);
  const [monthlyInvestment, setMonthlyInvestment] = useState(500);
  const [investmentDuration, setInvestmentDuration] = useState(1);
  const [expectedReturn, setExpectedReturn] = useState(1);
  const [result, setResult] = useState(null);
  const [chartData, setChartdata] = useState([]);

  // Constants for time calculations
  const TWENTY_DAYS_IN_MS = 15 * 24 * 60 * 60 * 1000; // 15 days in milliseconds

  useEffect(() => {
    // Check if the form has already been submitted (stored in localStorage)
    const formSubmitted = localStorage.getItem("emiformSubmitted");
    const submissionTimestamp = localStorage.getItem("submissionTimestamp");

    if (formSubmitted === "true" && submissionTimestamp) {
      const currentTime = Date.now();
      const timeDifference = currentTime - submissionTimestamp;

      // If 20 days have passed since submission, clear the localStorage
      if (timeDifference > TWENTY_DAYS_IN_MS) {
        localStorage.removeItem("emiformSubmitted");
        localStorage.removeItem("submissionTimestamp");
        setIsSubmitted(false); // Allow form to open again
      } else {
        setIsSubmitted(true); // Keep form closed if within 20 days
      }
    }
  }, []);


  const setDuration = (years) => {
    const parsedYears = parseFloat(years);
    if (!isNaN(parsedYears)) {
      setInvestmentDuration(parsedYears);
    }
  };

useEffect(() => {
  calculateSip();
}, [isMonthlySip, monthlyInvestment, oneTimeInvestment, investmentDuration, expectedReturn]);


  const calculateSip = () => {
    const monthlyRate = expectedReturn / 12 / 100; // Monthly rate as a decimal
    const annualRate = expectedReturn / 100; // Annual rate as a decimal
    const months = investmentDuration * 12; // Convert years to months

    let futureValue, totalInvestment;

    if (isMonthlySip) {
      // Calculate for Monthly SIP
      futureValue =
        monthlyInvestment *
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
        (1 + monthlyRate);
      totalInvestment = monthlyInvestment * months;
    } else {
      // Calculate for One-Time Investment
      futureValue = oneTimeInvestment * Math.pow(1 + monthlyRate, months);
      totalInvestment = oneTimeInvestment;
    }

    // Prepare data for each year to pass to the chart
    const yearlyData = [];

    // Calculate year-wise data
    for (let year = 1; year <= investmentDuration; year++) {
      let yearlyFutureValue;
      let yearlyTotalInvestment;

      if (isMonthlySip) {
        // Calculate future value for SIP investment up to this year
        const monthsInYear = year * 12;
        yearlyFutureValue =
          monthlyInvestment *
          ((Math.pow(1 + monthlyRate, monthsInYear) - 1) / monthlyRate) *
          (1 + monthlyRate);
        yearlyTotalInvestment = monthlyInvestment * monthsInYear;
      } else {
        // Calculate future value for one-time investment up to this year
        yearlyFutureValue = oneTimeInvestment * Math.pow(1 + annualRate, year);
        yearlyTotalInvestment = oneTimeInvestment;
      }

      // Push data for the chart every year
      yearlyData.push({
        year: year,
        investedAmount: Math.round(yearlyTotalInvestment), // Total amount invested up to this year
        growth: Math.round(yearlyFutureValue), // Future value at the end of the year
      });
    }

    // Set the chart data for each year
    setChartdata(yearlyData);
    // Set results with proper precision
    setResult({
      futureValue: Number(futureValue.toFixed(2)),
      totalInvestment: Number(totalInvestment.toFixed(2)),
    });
  };

  return (
    <section className="bg-[var(--rv-ternary)] ">
      <div className="max-w-screen-xl main_section mx-auto " ref={mainCounterRef}>
        <div className="  rounded-2xl">
          <motion.h2 className="text-4xl font-bold mb-6 text-[var(--rv-white)] items-center text-center" initial={{ x: -100, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Power of <span className="text-[var(--rv-secondary)]">SIP</span>
          </motion.h2>
          {/* <SectionHeading heading="SIP Calculator" title="Power of SIP" variant="dark" /> */}
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 ">
            <motion.div className="col-span-1 shadow-lg rounded-2xl bg-[var(--rv-primary)] px-10 py-4 flex flex-col justify-between"
            initial={{ x: -100, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            >
              <div className="input-fields pt-5">
                <h2 className="text-4xl font-bold mb-6 text-[var(--rv-white)] items-center text-center">
                  SIP Calculator
                </h2>
                <div className="flex justify-center space-x-4 mb-8">
                  <button
                    onClick={() => {
                      setIsMonthlySip(true);
                    }}
                    className={`py-4 px-10 md:px-20 font-bold ${
                      isMonthlySip
                        ? "rounded-lg bg-[var(--rv-bg-secondary)] text-[var(--rv-white)]"
                        : "bg-white rounded-lg text-black"
                    }`}
                  >
                    <p className="text-inherit">SIP</p>
                  </button>
                  <button
                    onClick={() => {
                      setIsMonthlySip(false);
                    }}
                    className={`py-4 px-4 md:px-16  font-bold ${
                      !isMonthlySip
                         ? "rounded-lg bg-[var(--rv-bg-secondary)] text-[var(--rv-white)]"
                        : "bg-white rounded-lg text-black"
                    }`}
                  >
                    <p className="text-inherit">Lumpsum</p>
                  </button>
                </div>
                <div className="input-fields">
                  {isMonthlySip ? (
                    <div>
                      <div className="flex justify-between">
                        <h5 className="font-medium text-[var(--rv-white)]">Monthly investment (₹)</h5>
                        <div className="">
                          <input
                            type="number" // Change type to number for better input handling
                            value={monthlyInvestment}
                            placeholder="0"
                            onChange={(e) =>
                              setMonthlyInvestment(parseFloat(e.target.value))
                            }
                            className="ml-2 px-2 font-bold text-lg text-[var(--rv-white)] w-36 border border-gray-400 "
                          />
                        </div>
                      </div>
                      <input
                        type="range"
                        min="500"
                        max="50000"
                        step="500"
                        value={(isNaN(monthlyInvestment)
                              ? 0
                              : monthlyInvestment)}
                        onChange={(e) =>
                          setMonthlyInvestment(parseFloat(e.target.value))
                        }
                        className="customRange w-full"
                          style={{
                            "--progress": `${(((isNaN(monthlyInvestment)
                              ? 0
                              : monthlyInvestment) -
                              500) /
                              (50000 - 500)) *
                              100}%`,
                          }}
                        aria-label="Monthly Investment Slider"
                      />
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between">
                        <h5 className="font-medium text-[var(--rv-white)]">Total investment (₹)</h5>
                        <div>
                          <input
                            type="number" // Change type to number for better input handling
                            value={oneTimeInvestment}
                            placeholder="0"
                            onChange={(e) =>
                              setOneTimeInvestment(parseFloat(e.target.value))
                            }
                            className="ml-2  px-2 font-bold text-lg text-[var(--rv-white)] w-36 border border-gray-400"
                          />
                        </div>
                      </div>
                      <input
                        type="range"
                        min="500"
                        max="50000"
                        step="500"
                        value={isNaN(oneTimeInvestment) ? 0 : oneTimeInvestment}
                        onChange={(e) =>
                          setOneTimeInvestment(parseFloat(e.target.value))
                        }
                        className="customRange w-full"
                          style={{
                            "--progress": `${(((isNaN(oneTimeInvestment)
                              ? 0
                              : oneTimeInvestment) -
                              500) /
                              (50000 - 500)) *
                              100}%`,
                          }}
                      />
                      
                    </div>
                  )}
                  <div className="items-center mt-5">
                    <div className="flex justify-between">
                      <h5 className="font-medium text-[var(--rv-white)]">Time period (Year)</h5>
                     <div>
                   
                     <div><input
                        type="number" // Change type to number for better input handling
                        value={investmentDuration}
                        placeholder="0"
                        onChange={(e) => setDuration(e.target.value)} // Update duration
                        className="ml-2 px-2 font-bold text-lg text-[var(--rv-white)] w-24  border border-gray-400"
                      />
                    </div>
                     </div>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="40"
                      step="1"
                       value={
                            isNaN(investmentDuration) ? 0 : investmentDuration
                          }
                      onChange={(e) => setDuration(e.target.value)} // Update duration
                     className="customRange w-full"
                          style={{
                            "--progress": `${(((isNaN(investmentDuration)
                              ? 0
                              : investmentDuration) -
                              1) /
                              (40 - 1)) *
                              100}%`,
                          }}
                    />
                  </div>
                  <div className="items-center mt-5">
                    <div className="flex justify-between">
                      <h5 className="font-medium text-[var(--rv-white)]">Expected Return (%)</h5>
                     <div>
                     <input
                        type="number" // Change type to number for better input handling
                        value={expectedReturn}
                        placeholder="0"
                        onChange={(e) => setExpectedReturn(e.target.value)} // Update duration
                        className="ml-2 px-2 font-bold text-lg text-[var(--rv-white)] w-24  border border-gray-400"
                      />
                    
                     </div>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      step="1"
                     value={isNaN(expectedReturn) ? 0 : expectedReturn}
                      onChange={(e) => setExpectedReturn(e.target.value)} // Update duration
                      style={{
                            "--progress": `${(((isNaN(expectedReturn)
                              ? 0
                              : expectedReturn) -
                              1) /
                              (30 - 1)) *
                              100}%`,
                          }}
                          className="customRange w-full"
                    />
                    
                  </div>
                </div>
                
              </div>
            </motion.div>
            <div className="col-span-1  flex flex-col gap-4">
              <motion.div className=" bg-[var(--rv-primary)] rounded-2xl" id="graphId"
               initial={{ y: -100, opacity: 0 }}
               animate={isInView ? { y: 0, opacity: 1 } : {}}
               transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
               >
                <SipHomeChart piedata={result} title={"SIP Calculator"} />
                
              </motion.div>
              <motion.div className="bg-[var(--rv-primary)] rounded-2xl" initial={{ y: 100, opacity: 0 }}
               animate={isInView ? { y: 0, opacity: 1 } : {}}
               transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
               >
              {result && (
                  <div className="mt-4 px-12">
                    <div className="mb-2 text-left flex items-center justify-start gap-3">
                      <p className="text-[var(--rv-white)] text-2xl">Your Invested Amount will be </p>{" "}
                      <p className="text-2xl font-extrabold text-[var(--rv-secondary)]">
                        ₹{result?.totalInvestment?.toLocaleString()}
                      </p>
                    </div>
                    <div className="mb-2 text-left flex items-center justify-start gap-3">
                      <p className="text-[var(--rv-white)] text-2xl">Your Estimated Return will be </p>
                      <p className="text-2xl font-extrabold text-[var(--rv-secondary)]">
                        ₹
                        {Math.floor(
                          result.futureValue - result.totalInvestment
                        )?.toLocaleString()}
                      </p>
                    </div>
                    <div className="mb-2 text-left flex items-center justify-start gap-3">
                      <p className="text-[var(--rv-white)] text-2xl mb-1">
                      You would have earned
                      </p>
                      <p className="text-2xl font-extrabold text-[var(--rv-secondary)]">
                        ₹{result?.futureValue?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </section>
  );
}
