// components/GoogleTranslate.jsx
"use client";
import { useEffect } from "react";

export default function GoogleTranslate() {
  useEffect(() => {
    const addScript = () => {
      if (document.getElementById("google-translate-script")) return;

      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi",
            autoDisplay: false,
          },
          "google_translate_element"
        );
      };
    };

    addScript();
  }, []);

  // When you select a language, trigger Google Translate
  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    const googleSelect = document.querySelector(".goog-te-combo");
    if (googleSelect) {
      googleSelect.value = lang;
      googleSelect.dispatchEvent(new Event("change"));
    }
  };

  return (
    <>
      {/* Custom dropdown shown in navbar */}
      <select
        onChange={handleLanguageChange}
        className=" px-1 py-1 text-[16px] "
      >
        <option defaultValue="en" className="bg-blue-500">English</option>
        <option className="bg-blue-500" value="hi">Hindi</option>
      </select>

      {/* Hidden Google Translate element */}
      <div id="google_translate_element" style={{ display: "none" }} />

      {/* Hide all ugly default Google stuff */}
      <style jsx global>{`
        .goog-te-banner-frame.skiptranslate,
        .goog-logo-link,
        .goog-te-gadget-icon {
          display: none !important;
        }
        body {
          top: 0 !important;
        }
        .goog-te-combo {
          display: none !important;
        }
      `}</style>
    </>
  );
}
