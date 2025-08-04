import { serve } from "bun";
import uploadPage from "./upload.html";
import filesPage from "./files.html";
import { readdir, stat, unlink, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { existsSync } from "node:fs";

const UPLOAD_DIR = "./uploads";

// Create uploads directory if it doesn't exist
if (!existsSync(UPLOAD_DIR)) {
  await mkdir(UPLOAD_DIR, { recursive: true });
  console.log("Created uploads directory");
}

// File metadata storage (in production, use a database)
const fileMetadata = new Map<string, { uploadDate: Date }>();

const server = serve({
  port: 3000,
  routes: {
    // Serve the upload page
    "/": uploadPage,
    "/upload": uploadPage,
    
    // Serve the files listing page
    "/files": filesPage,
    
    // API endpoint for file upload
    "/api/upload": {
      async POST(req) {
        try {
          const formData = await req.formData();
          const files = formData.getAll("files") as File[];
          
          if (files.length === 0) {
            return Response.json({ error: "No files provided" }, { status: 400 });
          }
          
          const results = [];
          
          for (const file of files) {
            if (!file || typeof file === "string") continue;
            
            const filename = file.name;
            const filepath = join(UPLOAD_DIR, filename);
            
            // Save file to disk
            await Bun.write(filepath, file);
            
            // Store metadata
            fileMetadata.set(filename, { uploadDate: new Date() });
            
            results.push({
              filename,
              size: file.size,
              url: `/uploads/${encodeURIComponent(filename)}`
            });
          }
          
          return Response.json({ 
            success: true, 
            files: results 
          });
        } catch (error) {
          console.error("Upload error:", error);
          return Response.json({ error: "Upload failed" }, { status: 500 });
        }
      }
    },
    
    // API endpoint to list files
    "/api/files": {
      async GET() {
        try {
          // Ensure directory exists before reading
          if (!existsSync(UPLOAD_DIR)) {
            await mkdir(UPLOAD_DIR, { recursive: true });
          }
          
          const files = await readdir(UPLOAD_DIR);
          const fileList = [];
          
          for (const filename of files) {
            const filepath = join(UPLOAD_DIR, filename);
            const stats = await stat(filepath);
            const metadata = fileMetadata.get(filename) || { uploadDate: stats.mtime };
            
            fileList.push({
              name: filename,
              size: stats.size,
              uploadDate: metadata.uploadDate.toISOString(),
              url: `/uploads/${encodeURIComponent(filename)}`
            });
          }
          
          // Sort by upload date (newest first)
          fileList.sort((a, b) => 
            new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
          );
          
          return Response.json(fileList);
        } catch (error) {
          console.error("List files error:", error);
          return Response.json({ error: "Failed to list files" }, { status: 500 });
        }
      }
    },
    
    // API endpoint to delete a file
    "/api/delete/:filename": {
      async DELETE(req) {
        try {
          const filename = decodeURIComponent(req.params.filename);
          const filepath = join(UPLOAD_DIR, filename);
          
          await unlink(filepath);
          fileMetadata.delete(filename);
          
          return Response.json({ success: true });
        } catch (error) {
          console.error("Delete error:", error);
          return Response.json({ error: "Failed to delete file" }, { status: 500 });
        }
      }
    },
    
    // Serve uploaded files
    "/uploads/*": (req) => {
      const url = new URL(req.url);
      const filename = decodeURIComponent(url.pathname.split("/uploads/")[1]);
      const filepath = join(UPLOAD_DIR, filename);
      
      return new Response(Bun.file(filepath));
    }
  },
  
  error(error) {
    console.error("Server error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
});

console.log(`Server running at ${server.url}`);