import { assets } from "@/Assets/assets";
import Image from "next/image";
import React from "react";

const Footer = ()=> {
    return (
        <div className='flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row bg-black py-0 items-center'>
            <Image src={assets.logo} alt='' width={140} />
            <p className='text-sm text-white'> All right reserved. Copyright @Isoblog - By Marcelo Ramos</p>
            <div className='flex gap-4'>
                <Image src={assets.facebook_icon} alt='' width={30}/>
                <Image src={assets.youtube_icon} alt='' width={30}/>
                <Image src={assets.instagram_icon} alt='' width={30}/>
            </div>

        </div>
    )
}

export default Footer;