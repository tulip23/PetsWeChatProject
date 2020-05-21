let fs = require('fs');
let path = require('path');
let moment = require('moment');
let multer = require('multer');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let t = moment().format('YYYY-M-D');
        let distPath = `../images/videos/${t}`;

        if (!fs.existsSync('../images/videos')) {
            fs.mkdirSync('../images/videos');
        }

        if (!fs.existsSync(distPath)) {
            fs.mkdirSync(distPath);
        }

        cb(null, distPath);
    },

    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + ext);
    }
});

let video = multer({storage: storage});

module.exports = video;