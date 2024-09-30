import multer from "multer";

// Store files in memory instead of on disk
const storage = multer.memoryStorage();

export const upload = multer({ storage: storage });