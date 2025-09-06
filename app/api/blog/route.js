import { ConnectDB } from "@/lib/config/db";
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { NextResponse } from "next/server"; 
import BlogModel from "@/lib/models/BlogModels";
const fs = require ('fs')

// Conexão com o DB 
const LoadDB = async () => {
    await ConnectDB();
}
LoadDB();

// Extensõe e tamanho máximo
const ALLOWED_EXTENSIONS = ['png', 'jpg', 'jpeg', 'webp'];
const MAX_FILE_SIZE = 5 * 2024 * 2024; // 5MB

//API Endpoint to Get All Blogs
export async function GET(request) {
    const blogId = request.nextUrl.searchParams.get ("id");
    if (blogId) {
        const blog = await BlogModel.findById (blogId);
        return NextResponse.json (blog);
    }
    else {
        const blogs = await BlogModel.find ( { } );
    return NextResponse.json({blogs});
    }

    
}


//API Endpoint for Uploading Blogs
export async function POST(request) {
    try {
        const formData = await request.formData();
        const image = formData.get('image');
        const timestamp = Date.now();
        

        // Validações 
        if (!image || typeof image === 'string') {
            return NextResponse.json(
                { error: 'Nenhuma imagem fornecida' },
                { status: 400 }
            );
        }

        if (image.size > MAX_FILE_SIZE) {
            return NextResponse.json(
                { error: 'Arquivo muito grande (máx. 5MB)' },
                { status: 400 }
            );
        }
        

        const fileExtension = image.name.split('.').pop()?.toLowerCase();
        if (!fileExtension || !ALLOWED_EXTENSIONS.includes(fileExtension)) {
            return NextResponse.json(
                { error: 'Tipo de arquivo não permitido' },
                { status: 400 }
            );
        }

        // Processamento da imagem 
        const imageByteData = await image.arrayBuffer();
        const buffer = Buffer.from(imageByteData);
        
        // Caminhos mais seguros 
        const publicDir = join(process.cwd(), 'public', 'uploads');
        await mkdir(publicDir, { recursive: true }); 
        
        const sanitizedFilename = image.name.replace(/[^a-zA-Z0-9_.-]/g, ''); // Segurança
        const filename = `${timestamp}_${sanitizedFilename}`;
        const path = join(publicDir, filename);
        
        await writeFile(path, buffer);
        
        const imgUrl = `/uploads/${filename}`; // Caminho relativo 

         const blogData = {
        title: `${formData.get ('title')}`,
        description: `${formData.get ('description')}`,
        category: `${formData.get ('category')}`,
        author: `${formData.get ('author')}`,
        image: imgUrl,
        authorImg:`${formData.get ('authorImg')}`

    }

    await BlogModel.create(blogData);
    console.log ('Blog saved');
    return NextResponse.json ({sucess:true,msg:'Blog add'})
       

    } catch (error) {
        console.error('Error saving image:', error);
        return NextResponse.json(
            { error: 'Erro interno ao processar imagem' },
            { status: 500 }
        );
    }

   

}

// Create API Endpoint to delete Blog

export async function DELETE  (request) {
    const id = await request.nextUrl.searchParams.get ('id');
    const blog = await BlogModel.findById(id);
    fs.unlink(`./public${blog.image}`,()=>{});
    await BlogModel.findByIdAndDelete(id);
    return NextResponse.json ({msg:"Blog Deleted"});
}

