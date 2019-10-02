import { Router } from 'express';
import multer from 'multer';
import authMiddleware from '../middlewares/auth.middleware';
import UserController from '../controllers/user.controller'
import PatchJsonController from '../controllers/patchjson.controller';
import ThumbnailController from '../controllers/thumbnail.controller'

const router = Router();
var upload = multer()

router.post('/login', UserController.loginUser);
router.patch('/jsonpatch', authMiddleware, PatchJsonController.patch);
router.post('/thumbnail', authMiddleware, upload.single('file'), ThumbnailController.create);

export default router;