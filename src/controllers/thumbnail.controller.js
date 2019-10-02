import { saveImage } from '../utils';

/**
 * @class ThumbnailController
 */
class ThumbnailController {
    /**
    * @param {object} request express request object
    * @param {object} response express request object
    * @returns {json} json
    * @memberof ThumbnailController
    */
    static async create(request, response){

        console.log('==>', request.body);

        if (!request.body.file) {
            return response.status(400).json({error: 'Please provide an image'});
        }

        const filename = await saveImage(request.file.buffer);

        return response.json({ thumbnail: `public/images/${filename}`});
    }
}

export default ThumbnailController;