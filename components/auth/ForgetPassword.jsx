"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export default function Signin() {
    const logintype = useSearchParams().get('type');
    const [error, setError] = useState("");
    const [mobileno, setMobileNo] = useState("");
    const [otp, setOtp] = useState("");
    const [otpField, setOtpField] = useState(false);
    const [provider, setProvider] = useState({
        userName: "",
        type: logintype,
        source: "link",
    });
    const otpData = {
        'OtpMobileNo': mobileno,
        'mobileOtp': otp
    }

     useEffect(() => {
        setProvider((prev) => ({
          ...prev,
          type: logintype === "ADMIN" ? "ARN" : logintype,
        }));
      }, [logintype]);
    // 448310
    console.log(otpData)
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (otpField) {
                const response = await axios.post('https://redvisionweb.com/api/login/submit-forget-password', otpData);
                console.log(response)
                console.log(response.data)
                if (response.data.msgType === 'success') {
                    setOtpField(true);
                    setError(response.data.msg);
                }
                else {
                    setError(`${response.data.msg}`);
                }
            }
            else {
                const response = await axios.post('https://redvisionweb.com/api/login/forget-password', provider);
                if (response.data.msgType === 'success') {
                    setOtpField(true);
                    setError(`One Time Password (OTP) has been sent to your mobile ******${response.data.mobileLastFourDigit} And e-mail to ${response.data.email}, please enter the same here to login`);
                    setMobileNo(response.data.encryptedMobileNo)
                }
                else {
                    setError(`${response.data.msg}`);
                }
            }

        } catch (error) {
            console.error("Error submitting the form:", error);
            setError("An error occurred while submitting the form. Please try again.");
        }
    };

    return (
        <>
            <div className="lg:w-1/2 xl:w-5/12 p-6 ">
                <div className="mt-12 flex flex-col items-center">
                    <h2 className="text-2xl text-white xl:text-3xl font-extrabold">Forgot Password</h2>
                    <div className="w-full flex-1 mt-8">
                        <div className="mx-auto max-w-xs">
                            <form onSubmit={handleSubmit}>
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="email"
                                    placeholder="Email"
                                    value={provider.userName}
                                    onChange={(e) =>
                                        setProvider({ ...provider, userName: e.target.value })
                                    }
                                />
                                {otpField && (
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-6"
                                        type="text"
                                        placeholder="OTP"
                                        value={provider.otp}
                                        onChange={(e) =>
                                            setOtp(e.target.value)
                                        }
                                    />
                                )}
                                <button className="mt-5 tracking-wide font-semibold bg-[var(--rv-primary)]  text-gray-100 w-full py-4 rounded-lg flex items-center justify-center focus:shadow-outline focus:outline-none hover:bg-[var(--rv-secondary)]">
                                    <svg
                                        className="w-6 h-6 -ml-2"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                        <circle cx="8.5" cy={7} r={4} />
                                        <path d="M20 8v6M23 11h-6" />
                                    </svg>
                                    <span className="ml-3">Submit</span>
                                </button>
                                {otpField ? (
                                    <div>
                                        {error && <div className="text-green-600 mt-2">{error}</div>}
                                    </div>
                                ) : (
                                    <div>
                                        {error && <div className="text-red-600 mt-2">{error}</div>}
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
