# File Uploader

A simple and elegant HTTP file uploader built with Bun, featuring drag-and-drop support, file management, and a clean UI powered by Tailwind CSS.

## Features

- 📤 **Drag-and-drop file uploads** with visual feedback
- 📁 **Multiple file selection** support
- 📋 **File management page** with download and delete capabilities
- 🗑️ **Delete confirmation** dialog for safety
- 🎨 **Clean, modern UI** with Tailwind CSS
- 📱 **Responsive design** for all devices
- 🚀 **Fast performance** powered by Bun
- 🔄 **No file size or type restrictions**

## Prerequisites

- macOS, Linux, or Windows (WSL)
- curl or wget (for installing Bun)

## Installation

### Step 1: Install Bun

If you don't have Bun installed, run one of these commands:

**macOS & Linux:**
```bash
curl -fsSL https://bun.sh/install | bash
```

**Or using npm (if you have Node.js):**
```bash
npm install -g bun
```

After installation, you may need to add Bun to your PATH. The installer will provide instructions if needed.

### Step 2: Clone the Repository

```bash
git clone https://github.com/darren/uploader.git
cd uploader
```

### Step 3: Install Dependencies

```bash
bun install
```

## Running the Application

Start the server with hot reload:

```bash
bun --hot server.ts
```

Or without hot reload:

```bash
bun server.ts
```

The server will start at `http://localhost:3000`

## Usage

1. **Upload Files:**
   - Navigate to `http://localhost:3000` or `http://localhost:3000/upload`
   - Drag and drop files onto the drop zone, or click to select files
   - Select multiple files at once if needed
   - Click "Upload All Files" to upload

2. **View Files:**
   - Navigate to `http://localhost:3000/files`
   - See all uploaded files with their size and upload date
   - Click "Download" to download a file
   - Click "Delete" to remove a file (with confirmation)
   - Use "Refresh" to update the file list

## Project Structure

```
uploader/
├── server.ts        # Bun server with all API routes
├── upload.html      # Upload page with drag-and-drop interface
├── files.html       # File listing page with management features
├── uploads/         # Directory where uploaded files are stored (gitignored)
├── package.json     # Project dependencies
├── tsconfig.json    # TypeScript configuration
└── README.md        # This file
```

## API Endpoints

- `GET /` or `/upload` - Upload page
- `GET /files` - File listing page
- `POST /api/upload` - Upload files endpoint
- `GET /api/files` - List all files
- `DELETE /api/delete/:filename` - Delete a specific file
- `GET /uploads/*` - Download/serve uploaded files

## Development

The project uses:
- **Bun** - Fast JavaScript runtime and bundler
- **TypeScript** - For type safety
- **Tailwind CSS** - For styling (via CDN)
- **Vanilla JavaScript** - No frontend framework dependencies

To modify the server, edit `server.ts`. The HTML files contain inline JavaScript for client-side functionality.

## Security Notes

This is a simple file uploader intended for local use or trusted environments. For production use, consider adding:
- Authentication and authorization
- File type validation
- File size limits
- Rate limiting
- Virus scanning
- Proper error logging

## License

MIT
