const connect = require('../db');
const Project = require('../models/Project');
const cloudinary = require('../cloudinary');

module.exports = async (req, res) => {
  try {
    await connect();
    if (req.method === 'GET') {
      const list = await Project.find().sort({ createdAt: -1 });
      return res.json(list);
    }
    if (req.method === 'POST') {
      // Accept multipart via data in JSON: { title, desc, eta, image } where image is data-url
      const { title, desc, eta, image } = req.body;
      let imageUrl = '';
      if (image) {
        const result = await cloudinary.uploader.upload(image, { folder: 'modern_profile' });
        imageUrl = result.secure_url || result.url || '';
      }
      const project = await Project.create({ title, desc, eta, imageUrl, status: 'coming' });
      return res.json(project);
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
