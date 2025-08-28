import JSZip from "jszip";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { projectName = "project", basePackage = "com.example", prompt = "" } = await req.json();

  const zip = new JSZip();
  zip.file(`${projectName}/README.md`, `# ${projectName}\n\nBase package: ${basePackage}`);
  zip.file(`${projectName}/PROMPT.txt`, prompt);

  const buffer = await zip.generateAsync({ type: "nodebuffer" });
  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${projectName}.zip"`
    }
  });
}
