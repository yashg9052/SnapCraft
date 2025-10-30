// routes/photos.js
const express = require('express');
const router = express.Router();
const Photo = require('../models/Photo');
const upload = require('../middleware/upload');

// Upload Photo
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { title, caption, username, filter } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image' });
    }

    const newPhoto = new Photo({
      title,
      caption,
      imageUrl: req.file.filename,
      filter: filter || 'none',
      username
    });

    await newPhoto.save();
    res.status(201).json({ 
      message: 'Photo uploaded successfully',
      photo: newPhoto
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all photos (Public Gallery)
router.get('/all', async (req, res) => {
  try {
    const photos = await Photo.find().sort({ createdAt: -1 });
    res.status(200).json(photos);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user's photos
router.get('/user/:username', async (req, res) => {
  try {
    const photos = await Photo.find({ username: req.params.username }).sort({ createdAt: -1 });
    res.status(200).json(photos);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Like a photo
router.post('/like/:id', async (req, res) => {
  try {
    const { username } = req.body;
    const photo = await Photo.findById(req.params.id);

    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' });
    }

    // Check if user already liked
    if (photo.likedBy.includes(username)) {
      // Unlike
      photo.likes -= 1;
      photo.likedBy = photo.likedBy.filter(user => user !== username);
    } else {
      // Like
      photo.likes += 1;
      photo.likedBy.push(username);
    }

    await photo.save();
    res.status(200).json({ 
      message: 'Like updated',
      likes: photo.likes,
      likedBy: photo.likedBy
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add comment
router.post('/comment/:id', async (req, res) => {
  try {
    const { username, text } = req.body;
    const photo = await Photo.findById(req.params.id);

    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' });
    }

    photo.comments.push({ username, text });
    await photo.save();

    res.status(200).json({ 
      message: 'Comment added',
      comments: photo.comments
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;