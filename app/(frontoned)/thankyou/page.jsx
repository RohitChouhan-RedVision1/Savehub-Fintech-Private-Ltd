import InnerBanner from "@/components/InnerBanner/InnerBanner"
import Image from "next/image"
import Link from "next/link"
import { FaArrowLeft } from "react-icons/fa6"

const ThankYou = async () => {
    return (
        <div>
            <InnerBanner pageName={"Thank You"} />
            <section>

            <div className='max-w-screen-xl mx-auto my-20 text-center flex flex-col items-center space-y-5'>
                <Image src={"/thankyou.gif"} width={300} height={100} alt="thankyou" />
                <h1 className='text-6xl  font-extrabold text-[var(--rv-white)]'>Thank You!</h1>
                <p className="mt-4 text-gray-200 ">We sincerely appreciate your interest and the time you took to fill out our enquiry form. We have received your details, and our team will be in touch with you soon.</p>
                <Link href={"/"}>
                    <FaArrowLeft size={30} className="text-[var(--rv-white)] cursor-pointer" />
                </Link>
            </div>
        </section>

        </div>
    )
}

export default ThankYou