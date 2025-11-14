const cloudinary = require('./cloudinaryConfig');
const db = require('./mongoConfig');
const Image = require('./imageModel');

cloudinary.uploader.upload('/storage/emulated/0/AFYALINK/logo.png', async function(error, result) {
  if(error) {
    console.log('Upload error:', error);
  } else {
    console.log('Upload success:', result.url);
    
    // Save URL to MongoDB
    const newImage = new Image({ url: result.url });
    await newImage.save();
    console.log('Image URL saved to MongoDB');
    process.exit(0); // exit after saving
  }
});
