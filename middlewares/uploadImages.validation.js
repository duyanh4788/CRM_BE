const multer = require('multer');

const uploadImgaesSingle = () => {
    const storage = multer.diskStorage({
        destination: function (req, res, cb) {
            cb(null, './public/images')
        },
        filename: function (req, file, cb) {
            cb(null, `${Date.now()}_${file.originalname}`)
        }
    })

    const upload = multer({
        storage,
        fileFilter: function (req, file, cb) {
            const filetypes = /jpeg|jpg|png|gif/;
            const mimetype = filetypes.test(file.mimetype);
            if (mimetype) {
                cb(null, true)
            } else {
                cb('Images Types : jpeg|jpg|png|gif')
            }
        }
    })

    return upload.single('avatar')
}

module.exports = {
    uploadImgaesSingle
}