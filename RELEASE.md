# Release Notes - v2.0.0

This major update introduces three powerful new tools, significant enhancements to existing utilities, and a host of UI/UX improvements to make Niazi Tools more flexible, intuitive, and efficient.

## 🚀 New Features

### 1. ✨ **New Tool: Time Interval Generator**
- Quickly generate a list of time entries based on a start time, interval (in minutes), and total count.
- Ideal for creating schedules, event timelines, and logs.
- Supports generating very large lists for direct download, preventing browser slowdowns.

### 2. ✨ **New Tool: Line Repeater**
- Repeat a single line of text thousands of times.
- Perfect for creating test data, populating spreadsheets, or generating bulk lists.
- Includes a direct download option for large-scale generation.

### 3. ✨ **New Tool: Email Campaign Builder**
- A sophisticated utility for assembling email campaign data.
- Combine a list of emails with rotating subjects and paragraphs.
- Automatically generates timed sending slots based on your defined interval.
- Output is presented in individually copyable and editable fields (Email, Subject, Paragraph, Time) for a streamlined workflow with any email client.
- Smart handling for large email lists, with a confirmation dialog for lists over 100 entries.

## 🌟 Enhancements

### **Copyable Paragraphs Tool Overhaul**
- Now supports adding up to 10 distinct paragraph fields manually.
- Allows for bulk uploading of multiple `.txt` files, where each file's content is treated as a separate paragraph.
- Original formatting, including line breaks and spacing, is fully preserved.

### **Email Extractor Improvements**
- Can now process multiple file uploads at once (.txt, .csv, .xls, .xlsx).
- Intelligently detects and prioritizes columns with "Email" headers in Excel files for more accurate extraction.

### **Find & Replace Enhancements**
- You can now add up to 10 find-and-replace rule pairs simultaneously.
- Undo your last replacement with a single click.

## 🎨 UI/UX Improvements

- **Global Scroll-to-Top Button:** A new button appears in the bottom-right corner when scrolling, allowing for quick navigation back to the top of the page.
- **Global "Start Over" Button:** Each tool now features a "Start Over" button at the top for quickly clearing inputs and outputs.
- **Improved File Uploads:** All file upload buttons now include helper text specifying the supported file types.
- **Refined Dialogs:** New and improved dialogs for nickname entry, large file downloads, and email list limits provide a clearer, more user-friendly experience.
- **Responsive Design:** Enhanced styling to ensure all tool outputs, especially the multi-field Campaign Builder, are fully viewable and functional on mobile and tablet devices.

## 🐛 Bug Fixes

- Fixed an issue where the "Mark as copied" feature was not working correctly in the Campaign Builder.
- Resolved a hydration error related to server/client rendering mismatches.
- Corrected various minor styling and layout inconsistencies.
