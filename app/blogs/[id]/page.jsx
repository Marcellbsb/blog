"use client";
import { assets } from "@/Assets/assets";
import Footer from "@/Components/Footer";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Page = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        // Extrai o ID da URL
        const segments = pathname.split('/');
        const blogId = segments[segments.length - 1];
        
        console.log("Fetching blog with ID:", blogId);
        
        const response = await axios.get('/api/blog', {
          params: { id: blogId }
        });
        
        console.log("Response data:", response.data);
        setData(response.data);
      } catch (err) {
        console.error("Error fetching blog data:", err);
      } finally {
        setLoading(false);
      }
    }

    if (pathname) {
      fetchBlogData();
    }
  }, [pathname]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        <span className="ml-3">Carregando...</span>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Blog não encontrado</h2>
          <Link href="/" className="text-blue-600 hover:underline">
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='bg-gray-200 py-5 px-5 md:px-12 lg:px-28'>
        <div className='flex justify-between items-center'>
          <Link href='/'>
            <Image src={assets.logo} width={180} alt='Logo' className='w-[130px] sm:w-auto'/>
          </Link>
          <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]'>
            Get started <Image src={assets.arrow} alt='Arrow' />
          </button>
        </div>

        <div className='text-center my-24'>
          <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{data.title}</h1>
          <Image 
            className='mx-auto mt-6 border border-white rounded-full' 
            src={data.authorImg} 
            width={60} 
            height={60} 
            alt='Author'
          />
          <p className='mt-1 mb-2 text-lg max-w-[740px] mx-auto'>{data.author}</p>
        </div> 
      </div>
      
      <div className='mx-5 max-w-[450px] md:mx-auto mt-[-100px] mb-10'>
        <Image 
          className='border-4 border-white' 
          src={data.image} 
          width={1280} 
          height={720} 
          alt='Blog image'
        />
        <div 
          className='blog-content mt-6' 
          dangerouslySetInnerHTML={{__html: data.description}}
        ></div> 
        
        <div className='my-24'></div>
        <p className='text-black font-semibold my-4'>Share this article on social media</p>
        <div className='flex gap-4'>
          <Image src={assets.instagram_icon} width={32} alt='Instagram'/>
          <Image src={assets.facebook_icon} width={32} alt='Facebook'/>
          <Image src={assets.youtube_icon} width={32} alt='YouTube'/>
        </div>
      </div>
      
      <Footer/>
    </>
  );
};

export default Page;