import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";
  import { Button } from "@/components/ui/button";
  import Link from "next/link";
  import React from "react";
import { getSiteData } from "../layout";
import InnerBanner from "@/components/InnerBanner/InnerBanner";
import { AboutSection } from "@/components/AboutUs/aboutus";
import HeaderAboutus from "@/components/Aboutuspage/Header/header";
import { getAboutus, getAboutusteams, getmissionvission } from "@/lib/functions";
import WhoWeare from "@/components/Aboutuspage/whoweare";
import TeamSection from "@/components/Aboutuspage/teamsection/teamsection";
import Whatwedo from "@/components/Aboutuspage/Whatwedo.jsx";

  
  export const metadata = {
    title: "About Us - Renaissance Financial Wealth",
    description:
      "Learn more about Renaissance Financial  Wealth, your trusted financial partner in India.",
  };
  
  const AboutUsPage = async () => {
    const aboutus= await getAboutus()
    const missionVission =await getmissionvission();
    const teams= await getAboutusteams()
    return (
      <div>
        <InnerBanner pageName="About Us" />    
       <HeaderAboutus aboutus={aboutus} />
       <WhoWeare aboutus={aboutus} missionVission={missionVission}/>
       <TeamSection teams={teams} />
       <Whatwedo />
      </div>
    );
  };
  
  export default AboutUsPage;