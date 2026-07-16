import express from 'express';
import { fetch_posts, fetch_post, new_post, update_post, delete_post } from '../controllers/post_controller.js'

const router = express.Router();

router.get('/', fetch_posts);
router.get('/:post_id', fetch_post);
router.post('/', new_post);
router.put('/:post_id', update_post);
router.delete('/:post_id', delete_post);

export default router;
