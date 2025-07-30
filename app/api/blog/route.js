import { ConnectDB } from "@/lib/config/db";
import { writeFile, mkdir } from "fs/promises"; 
import { join } from "path";
import { NextResponse } from "next/server"; 

// Carrega a conexão com o DB (mantendo a implementação)
const LoadDB = async () => {
  await ConnectDB();
};
LoadDB();

// Extensões permitidas e tamanho máximo 
const ALLOWED_EXTENSIONS = ["png", "jpg", "jpeg", "webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function GET(request) {
  return NextResponse.json({ msg: "API working" });
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const image = formData.get("image");
    const timestamp = Date.now();

    // Validações 
    if (!image || typeof image === "string") {
      return NextResponse.json(
        { error: "Nenhuma imagem fornecida" },
        { status: 400 }
      );
    }

    if (image.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Arquivo muito grande (máx. 5MB)" },
        { status: 400 }
      );
    }

    const fileExtension = image.name.split(".").pop()?.toLowerCase();
    if (!fileExtension || !ALLOWED_EXTENSIONS.includes(fileExtension)) {
      return NextResponse.json(
        { error: "Tipo de arquivo não permitido" },
        { status: 400 }
      );
    }

    // Processamento da imagem 
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);

    // Caminhos seguros 
    const publicDir = join(process.cwd(), "public", "uploads");
    await mkdir(publicDir, { recursive: true }); // Garante que a pasta existe

    const sanitizedFilename = image.name.replace(/[^a-zA-Z0-9_.-]/g, ""); // Segurança
    const filename = `${timestamp}_${sanitizedFilename}`;
    const path = join(publicDir, filename);

    await writeFile(path, buffer);

    const imgUrl = `/uploads/${filename}`; // Caminho 
    return NextResponse.json({ imgUrl });
  } catch (error) {
    console.error("Error saving image:", error);
    return NextResponse.json(
      { error: "Erro interno ao processar imagem" },
      { status: 500 }
    );
  }
}
