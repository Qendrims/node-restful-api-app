const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});

const fileFilter =(req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'
    || file.mimetype === 'image/jpg'){
        cb(null, true);
    } else{
        cb(null, false);
    }
};


const upload = multer({
    storage:storage, 
    limits:{
    fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const ProductController = require('../controllers/products');

router.get('/', ProductController.get_all);


router.post('/', upload.single('productImage'), checkAuth, ProductController.create);

router.get('/:productId', ProductController.get_product_by_id);

router.patch('/:productId', checkAuth, ProductController.update);

router.delete('/:productId', checkAuth, ProductController.delete);

module.exports = router;