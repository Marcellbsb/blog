import { assets } from "@/Assets/assets";
import Image from "next/image";
import React from "react";

const Header = () => {

    return (
        <div className='py-0 top-0 px-5 md:px-12 lg:px-28 '>
            <div className='flex justify-between items-center  '>
                <Image src={assets.logo} width={160} alt="" className="w-[130px] sm:w-auto"/>
                <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black'>Get Started <Image src={assets.arrow} alt=""/></button>

            </div>

        </div>
    );

}

export default Header;