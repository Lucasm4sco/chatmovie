import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'profile_picture')
            return cb(null, 'uploads/perfil');

        return cb(null, 'uploads/capa');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.png'
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const imageUpload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const invalidFormat = !file.originalname.match(/\.(png|jpg|jpeg)$/);
        if (invalidFormat) {
            return cb(
                new Error('Envie apenas os seguintes formatos: JPG, JPEG ou PNG!')
            );
        }
        cb(undefined, true)
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // limite de 5MB
    }
})

const imageUploadValidation = (req, res, next) => {
    try {
        const upload = imageUpload.fields([
            { name: 'profile_picture', maxCount: 1 },
            { name: 'cover_image', maxCount: 1 }
        ]);
        upload(req, res, (error) => {
            if (error) {
                if (error.code === 'LIMIT_FILE_SIZE')
                    return res.status(422).json({ errors: ['O tamanho do arquivo não pode ser maior que 5MB.'] });

                return res.status(422).json({ errors: [error.message] });
            }

            next()
        });
    } catch (error) {
        res.status(500).json({ errors: ['Ocorreu um erro ao lidar com os arquivos, tente novamente mais tarde'] })
    }
}

export default imageUploadValidation