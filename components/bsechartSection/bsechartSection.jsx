"use client";
import React, { useEffect, useState, useRef } from "react";
import styles from "./bsechartSection.module.css";
import axios from "axios";
import { BseReturnChart } from "@/components/charts/bseReturnChart";
import { motion, useInView } from "framer-motion";

export default function BseChartSection() {
  const [graphData, setGraphData] = useState([]);
  const chartRef = useRef(null);
  const isInView = useInView(chartRef, { once: true, margin: "0px 0px -100px 0px" });

  const fetchGraphData = async () => {
    try {
      const today = new Date();
      const formattedToday = today.toISOString().split("T")[0];

      const response = await axios.post(
        "https://wealthelite.in/eliteN/bse-schemes/get-sensex-data",
        {
          startDate: "1997-01-01",
          endDate: formattedToday,
        }
      );

      if (response.status === 200) {
        setGraphData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching graph data:", error);
    }
  };

  useEffect(() => {
    fetchGraphData();
  }, []);

  // console.log(graphData)
  return (
    <section className="">
      <div className="">
        <div className={styles.consultationContainer}>
          {/* Section Heading - optional */}
          {/* You can place a title here */}
          
          <motion.div
            ref={chartRef}
            initial={{ x: -100, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="col-span-1 md:col-span-2"
          >
            <BseReturnChart data={graphData} animate={isInView} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
