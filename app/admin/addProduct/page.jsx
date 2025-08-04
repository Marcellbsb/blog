'use client'

import { assets } from "@/Assets/assets";
import axios from "axios";
// import { set } from "mongoose"; // Remova esta importação se não estiver usando
import Image from "next/image";
import React, { useState, useEffect } from "react"; // Adicione useEffect para depuração
import { toast } from "react-toastify";

const Page = () => { // Boa prática: nome de componente começa com maiúscula

   const [image , setImage] = useState(false);
   const [data,setData] = useState({
    title:"",
    description:"",
    category:"Lifestyle",
    author:"Kerollayne Ramos",
    authorImg:"/author_img.png",
   })

   const onChangeHandler =(event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(prevData => ({...prevData,[name]:value})); // Usar prevData é uma prática mais segura
   }

   const onSubmitHandler= async (e) => {
    e.preventDefault ();
    const formData = new FormData();
    formData.append ('title', data.title);
    formData.append ('description', data.description);
    formData.append ('category', data.category);
    formData.append ('author', data.author);
     formData.append ('authorImg', data.authorImg);
      formData.append ('image',image);
      const response = await axios.post ('/api/blog',formData);
      if (response.data.sucess) {
        toast.success (response.data.msg)

      } else {
        toast.error ("Error");
      }

    
   }



   // Use useEffect para observar o estado 'data' *depois* que ele foi atualizado
   useEffect(() => {
     console.log('Current data state:', data);
   }, [data]);


   return (
     <>
     <form onSubmit={onSubmitHandler} className='pt-5 px-5 sm:pt-12 sm:pl-16 '>
        <p className='text-xl'>Upload thumbnail</p>
        {/* === AQUI É O PONTO CRÍTICO: Este label é APENAS para o input de imagem === */}
        <label htmlFor='image'>
            <Image className='mt-4 ' src={!image ? assets.upload_area : URL.createObjectURL(image)} width={90} height={30} alt=''/>
            <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden required/>
        </label>
        {/* ========================================================================= */}
            
        <p className='text-xl mt-4'>Blog title</p> 
        <input name='title' onChange={onChangeHandler} value={data.title} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type='text' placeholder='Type here' required/> 

        <p className='text-xl mt-4'>Blog description</p> 
        <textarea name='description' onChange={onChangeHandler} value={data.description} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type='text' placeholder='Write content here' rows={6} required/>
            
        <p className='text-xl mt-4'>Blog category</p> 
        <select name='category' onChange={onChangeHandler} value={data.category} className='w-40 mt-4 mb-2 px-4 py-3 border text-gray-500'>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Startup">Startup</option>
            <option value="Technology">Technology</option>
        </select>
        <br/>
        <button type='submit' className='w-40 mt-8 mb-2 h-12 bg-black text-white'>ADD</button>

     </form>
     </>
   )
}

export default Page; // Exportando o componente com o nome de convenção