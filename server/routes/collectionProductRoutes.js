const express = require('express');
const multer = require('multer');
const {
  createCollectionProduct,
  getCollectionProducts,
  getAllCollectionProducts,
  getCollectionProductById,
  updateCollectionProduct,
  deleteCollectionProduct,
} = require('../controllers/collectionProductController');

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.get('/products', getAllCollectionProducts);

router.post('/:collectionId/products', upload.array('images', 5), createCollectionProduct);

router.get('/:collectionId/products', getCollectionProducts);

router.get('/:collectionId/products/:productId', getCollectionProductById);

router.put('/:collectionId/products/:productId', upload.array('images', 5), updateCollectionProduct);

router.delete('/:collectionId/products/:productId', deleteCollectionProduct);

module.exports = router;
