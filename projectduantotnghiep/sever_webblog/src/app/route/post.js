import express from 'express';  
const routerPost = express.Router();
import multer from 'multer';
import {validatePost} from '../commons/validate/post.validate.js';
import PostController from '../controllers/ControllerPost.js';
import {uploadpost} from '../commons/helper/uploadimage.js';
import {checkRole} from '../commons/middelware/checkrole.js';


routerPost.post('/uploadimage',uploadpost, PostController.uploadImg)
routerPost.post('/creatpost', validatePost.validpost, PostController.creatPost)
routerPost.post('/updatepost', PostController.updatePost)
routerPost.post('/deletepost',checkRole.isAdmin, PostController.deletePost)



export default routerPost;