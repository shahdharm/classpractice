const { text } = require('express')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination:(req, file,cb)=>{
        cb(null, './uploads')
    },
    filename:(req,file,cb) =>{
        let ext = path.extname(file.originalname)

        cb(null, `${file.fieldname}-${Date.now()}${ext}`)

    }
})
const imageFileFiter = (req,file, cb) =>{
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        return cb(new Error('file format not supported.'),false)
    }
    cb(null,true)
}
const upload = multer({
    storage: storage,
    fileFilter: imageFileFiter,
    limits: { fileSize: 2 * 1024 * 1024}
})

// const upload = multer({ storage:storage})
module.exports = upload