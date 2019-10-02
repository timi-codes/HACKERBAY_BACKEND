import jwt from 'jsonwebtoken';
import uuidv4 from 'uuidv4';
import path from 'path';

/**
* @description - signs token
* @param {object} payload
*/
export const jwtSigner = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
}


export const  saveImage = async(buffer) => {
    const filename = `${uuidv4()}.png`;
    const filepath = path.join(__dirname, `/public/images/${filename}`);

    await sharp(buffer).resize(50, 50, {
        fit: sharp.fit.inside,
        withoutEnlargement: true
    }).toFile(filepath);

    return filename;
}

export const beutifyJoiError = (error) => {
    return error.details ? error.details[0].message.replace(/['"]/g, '') : err.message
}
