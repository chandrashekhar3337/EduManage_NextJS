import { SchoolModel } from '../models/school.model.js';
import cloudinary from '../lib/cloudinary.js';
import fs from 'fs';

export const SchoolController = {
  async create(req, res) {
    const { name, address, city, state, contact, email_id } = req.body;
   console.log("BODY:", req.body);
   console.log("FILE:", req.file);
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Image is required' });
    }
    console.log("FILE:", req.file);
    try {
      // Upload file buffer to cloudinary
      const uploadRes = await cloudinary.uploader.upload(req.file.path, {
        folder: 'schools',
        resource_type: 'image',
      });


      // delete temp file (multer stores in /tmp)
      fs.unlinkSync(req.file.path);

      // Save record in DB
      const result = await SchoolModel.create({
        name,
        address,
        city,
        state,
        contact,
        email_id,
        image: uploadRes.secure_url, // store Cloudinary URL
      });

      return res.status(201).json({ success: true, id: result.id, imageUrl: uploadRes.secure_url });
    } catch (err) {
      console.error('Create error:', err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  },

  async list(req, res) {
  try {
    const rows = await SchoolModel.findAll({ attributes: ['id', 'name', 'address', 'city', 'image','contact','email_id'] }); // plain JS objects
    console.log("ROWS:", rows);
    return res.status(200).json({ success: true, data: rows });
  } catch (err) {
    console.error("LIST ERROR:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
},

async getById(req, res) {
  try {
    const { id } = req.query;
const school = await SchoolModel.findByPk(id);
    if (!school) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: school });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}
};

