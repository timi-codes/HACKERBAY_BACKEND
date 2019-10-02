import Joi from '@hapi/joi';
import {jwtSigner, beutifyJoiError} from '../utils';

const loginSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .required(),
    password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
});

/**
 * @class UserController
 */
class UserController {

    /**
    * @param {object} request express request object
    * @param {object} response express request object
    * @returns {json} json
    * @memberof UserController
    */
    static loginUser(request, response){
        const loginCredential = request.body;

        const { error, value } = loginSchema.validate(loginCredential);

        if(!error) {
            const token = jwtSigner({
                username: loginCredential.username
            });   
     
            response.status(200).send({
                token,
                message: 'You\'ve been successfully logged in'
            });
        }

        response.status(400).send({ 
            error : beutifyJoiError(error)
        });
    }
}

export default UserController;