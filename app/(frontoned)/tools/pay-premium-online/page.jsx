"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import InnerBanner from "@/components/InnerBanner/InnerBanner";

export default function PayPremium() {
  const [allCategory, setAllCategory] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(""); // category _id
  const [selectedCategoryTitle, setSelectedCategoryTitle] = useState(""); // display title
  const [amcLogoData, setAmcLogoData] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategoryId) {
      fetchLogos(selectedCategoryId);
    }
  }, [selectedCategoryId]);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/amc-category");
      const data = await res.json();

      const filtered = data.filter((cat) =>
        ["Life Insurance", "Health Insurance", "General Insurance"].includes(cat.title)
      );

      setAllCategory(filtered);

      if (filtered.length > 0) {
        setSelectedCategoryId(filtered[0]._id);
        setSelectedCategoryTitle(filtered[0].title);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

const fetchLogos = async (categoryID) => {
  try {
    const res = await fetch(`/api/amc-logos?categoryID=${categoryID}&addisstatus=true`);
    const data = await res.json();
    if (data.success) {
      setAmcLogoData(data.data);
    }
  } catch (err) {
    console.error("Failed to fetch AMC Logos:", err);
  }
};


  return (
    <div className="">
      <InnerBanner pageName=" Pay Premium Online" />
      <section className="max-w-screen-xl mx-auto main_section">
     

        <div>
          {/* CATEGORY BUTTONS */}
          <div className="md:px-5 py-4 bg-[var(--rv-secondary)] text-black flex flex-wrap gap-2 md:gap-4 rounded">
            {allCategory.map((cat) => (
              <div
                key={cat._id}
                className={`cursor-pointer uppercase px-4 py-2 rounded font-semibold hover:text-[--rv-primary] ${
                  selectedCategoryId === cat._id
                    ? "text-[var(--rv-secondary)] bg-[var(--rv-primary)]"
                    : ""
                }`}
                onClick={() => {
                  setSelectedCategoryId(cat._id);
                  setSelectedCategoryTitle(cat.title);
                }}
              >
                {cat.title}
              </div>
            ))}
          </div>

          {/* AMC LOGOS */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-x-3 my-4">
            {amcLogoData.map((item, index) => (
              <Link href={item.logourl || "#"} key={index} target="_blank">
                <div className="flex justify-center p-5 border text-center mb-3">
                  <Image
                    src={`https://redvisionweb.com/${item.logo}`}
                    alt={`logo-${item.logoname}`}
                    width={150}
                    height={100}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
