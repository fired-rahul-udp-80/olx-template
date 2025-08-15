import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import Listing from '../models/Listing.js'

const router = Router()

// Multer config (store on disk)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(process.cwd(), 'uploads')
    if (!fs.existsSync(dir)) fs.mkdirSync(dir)
    cb(null, dir)
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname)
    const base = path.basename(file.originalname, ext).replace(/[^a-z0-9]+/gi,'-').toLowerCase()
    cb(null, base + '-' + Date.now() + ext)
  }
})
const upload = multer({ storage })
 


router.get('/listings', async (req, res) => {
  const listData = await Listing.find({})
    .sort({ createdAt: -1 })
    .limit(Number(req.query.limit) || 50);

  const list = listData.map(item => {
    const baseUrl = `${req.protocol}://${req.get('host')}/uploads`;

    return {
      ...item._doc,
      images: item.images.map(img => `${baseUrl}/${img}`)
    };
  });

  res.json(list);
});



router.post('/listings', upload.array('images', 5), async (req, res) => {
  try {
    const { title, description, price, category, subcategory, attributes } = req.body;
    // Multer will give attributes as an object if sent as attributes[key]
    const images = (req.files || []).map(f => f.filename);

    const doc = await Listing.create({
      title,
      description,
      price,
      category,
      subcategory,
      attributes,
      images
    });

    res.status(201).json(doc);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Invalid payload' });
  }
});


// in routes/listings.js
router.get("/:id", async (req, res) => {
  try {
    const doc = await Listing.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json(doc);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});


export default router
