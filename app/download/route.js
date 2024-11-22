import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import ReactPDF from "@react-pdf/renderer";
import { ResumePDF } from "../../components/pdf-download-button";

export async function GET() {
  const resumeContent = await fs.readFile(
    path.join(process.cwd(), "resume.md"),
    "utf8"
  );

  const pdfStream = await ReactPDF.renderToStream(
    <ResumePDF content={resumeContent} />
  );

  const pdfBuffer = await new Promise((resolve) => {
    const chunks = [];
    pdfStream.on("data", (chunk) => chunks.push(chunk));
    pdfStream.on("end", () => resolve(Buffer.concat(chunks)));
  });

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="resume.pdf"',
    },
  });
}
