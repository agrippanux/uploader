# ISSUE-001: Build Simple HTTP Uploader

**Status:** WIP
**Created:** 2025-08-04
**Assignee:** Darren Craine
**Priority:** High
**Labels:** feature, frontend, backend

## Description

Build a simple HTTP file uploader using Bun with two main pages:
1. Upload page - allows selecting/drag-drop multiple files to upload
2. File listing page - shows all uploaded files with ability to delete

Requirements:
- Use Bun.serve for the backend
- Vanilla JavaScript/CSS for frontend
- Use Tailwind for styling
- Files stored in /uploads directory
- No file size limits
- Accept any file type
- No authentication required
- Delete confirmation dialog
- Keep original filenames
- Support multiple file uploads
- Show filename, size, and upload date in listing
- Clean, elegant design with header navigation

## Tasks

- [ ] Set up project structure and create uploads directory
- [ ] Add uploads/ to .gitignore to avoid committing uploaded files
- [ ] Create Bun server with routes for upload, listing, and file serving
- [ ] Build upload page with drag-and-drop and multi-file support
- [ ] Build file listing page with delete functionality
- [ ] Add Tailwind CSS and create elegant UI
- [ ] Test all functionality and error handling

## Subtasks

- [ ] [[ISSUE-001-http-uploader-a]] - Create server.ts with all API routes
- [ ] [[ISSUE-001-http-uploader-b]] - Create upload.html with drag-drop interface
- [ ] [[ISSUE-001-http-uploader-c]] - Create files.html with listing and delete
- [ ] [[ISSUE-001-http-uploader-d]] - Style with Tailwind and add navigation
- [ ] [[ISSUE-001-http-uploader-e]] - Test upload, download, and delete flows

## Related Issues

None

## Relationships

None

## Comments

### 2025-08-04 - System

Issue created for building HTTP file uploader with Bun.

## Implementation Log

<!-- Auto-generated log of actual development work performed by the LLM -->