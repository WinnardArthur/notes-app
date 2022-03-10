const router = require('express').Router();
const { upload } = require('../helpers/fileUpload')

router.post('/upload', upload.single('file'), (req, res) => {
    try {
        res.status(200).json(req.file)
    } catch (error) {
        res.status(400)
        throw new Error("Error uploading file")
    }
})



module.exports = router;