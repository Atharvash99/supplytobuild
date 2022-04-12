const { Router } = require('express')
const Product = require('../Modal/Product')
const User = require('../Modal/User')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const ProductRoute = Router()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = "./public/uploads"
        cb(null, dir)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg')
            cb(null, true)
        else {
            cb(null, false)
            return cb(new Error('Only .png .jpg and .jpeg are allowed!'))
        }
    }
})
ProductRoute.get('/', async(req, res) => {
    await Product.find({}, (err, product) => {
        if (err)
            return res.status(400).json({msg:'Something Whent wrong'}) 
        return res.json(product)
    })
})
ProductRoute.get('/:id', async(req, res) => {
    const product = await Product.findById({ _id: req.params.id })
    if(product)
        return res.json(product)
    else
        res.status(400).json({msg:'Product Not Found'})
})
ProductRoute.post('/upload', upload.array('images', 3), (req, res) => {
    jwt.verify(req.headers.token, 'NULL', (err, decoded) => {
        if (err) throw err
        User.findById(decoded.userId, (err, user) => {
            if (err) throw err
            if (user.isAdmin) {
                const reqFiles = []
                const url = req.protocol + '://' + req.get('host')
                for (var i = 0; i < req.files.length; i++)
                {
                    reqFiles.push(url+'/uploads/'+req.files[i].filename)
                }
                const newProduct = new Product({
                    name: req.body.name, brand: req.body.brand, images: reqFiles,
                    category: req.body.category, inStock: req.body.stock, price: req.body.price
                })
                newProduct.save(err => {
                    if (err) throw err
                    console.log(reqFiles)
                })
            }
        })
    })
})
module.exports = ProductRoute