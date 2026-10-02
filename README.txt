# ICS Student Digital ID Card Website

## What this website does
- Contains 20 student records.
- Each student has a unique Student ID.
- Each card automatically gets a QR code.
- Scanning the QR code opens only that student's digital card.
- No database or server is required.
- It can be uploaded as a normal static website.

## How to edit students
Open `students.js` in Notepad or VS Code and replace the sample values.

Example:
{id:"ICS001", name:"K. Kumar", course:"ICTT NVQ Level 03", batch:"2026 / B06", dob:"15/05/2005", phone:"0771234567", photo:"photos/ICS001.jpg"}

## Adding photos
1. Create a folder called `photos`.
2. Put each student's photo inside it.
3. Use the exact file name in `students.js`.
4. Example: `photo:"photos/ICS001.jpg"`

## Important
The QR code uses the website's current address automatically. Therefore:
1. Upload the website first.
2. Open the final public website.
3. The QR codes will then point to that public website.

If you change the website address later, the QR codes will automatically use the new address when the page is loaded, so you can reprint the cards if the old QR was already printed.

## Upload
You can upload the whole folder to any static hosting service such as GitHub Pages, Netlify, Cloudflare Pages, or another web host.
