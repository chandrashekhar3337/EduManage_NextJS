import { createRouter } from 'next-connect';
import { uploadMiddleware } from '../../../middleware/upload.middleware.js';
import { SchoolController } from '../../../controllers/school.controller.js';

const handler = createRouter({
  onError(err, req, res) {
    console.error('API Error:', err);
    res.status(500).json({ success: false, message: err.message });
  },
  onNoMatch(req, res) {
    res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  },
});

// GET → list all schools
handler.get(SchoolController.list);

// POST → add new school
handler.post(
  uploadMiddleware,
  SchoolController.create
);

// ❌ Next.js ke liye .handler() call karna zaroori hai
export const config = {
  api: {
    bodyParser: false, // multer needs this
  },
};

export default handler.handler();
