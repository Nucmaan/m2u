import multer from "multer";
import { NextResponse } from "next/server";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const multerHandler = (req, res) =>
  new Promise((resolve, reject) => {
    upload.single("avatar")(req, res, (err) => {
      if (err) {
        console.error("Multer error:", err);
        reject(NextResponse.json({ error: "File upload failed" }, { status: 500 }));
      } else {
        console.log("Multer success, file:", req.file); // Debugging log
        resolve(req.file); // Return the uploaded file
      }
    });
  });
