import Joi from '@hapi/joi';
import jsonpatch from 'jsonpatch';

const patchSchema = Joi.object({
    doc: Joi.any().required(),
    patch: Joi.any()
});


/**
 * @class PatchController
 */
class PatchJsonController {
    /**
    * @param {object} request express request object
    * @param {object} response express request object
    * @returns {json} json
    * @memberof PatchController
    */
    static patch(request, response){
        const data = request.body;
        const { error, value } = patchSchema.validate(data);

        if(!error) {
            try {
                const doc = typeof(data.doc)=="string" ? JSON.parse(data.doc) : data.doc;
                const patch = typeof(data.patch)=="string" ? JSON.parse(data.patch) : data.patch;
                const newdoc = jsonpatch.apply_patch(doc, patch);
                response.status(200).send(newdoc);
            } catch(error){
                response.status(400).send({error: error.message});
            }
        }
    }
};

export default PatchJsonController;