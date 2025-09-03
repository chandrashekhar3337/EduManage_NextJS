import { SchoolController } from '../../../controllers/school.controller.js';

export default function handler(req, res) {
  if (req.method === 'GET') {
    return SchoolController.getById(req, res);
  } else {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
