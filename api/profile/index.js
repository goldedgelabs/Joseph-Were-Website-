const connect = require('../db');
const Profile = require('../models/Profile');

module.exports = async (req, res) => {
  try {
    await connect();
    if (req.method === 'GET') {
      let profile = await Profile.findOne();
      if (!profile) profile = await Profile.create({});
      return res.json(profile);
    }
    if (req.method === 'PUT') {
      const updates = req.body;
      let profile = await Profile.findOneAndUpdate({}, updates, { new: true, upsert: true });
      return res.json(profile);
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
