import { Router } from 'express';
import {
  getUsers, getUser, createUser, updateUser, updateAvatar,
} from '../controllers/users';

const router = Router();

router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/', createUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

export default router;
