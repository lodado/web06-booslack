import { Router } from 'express';
import {
  getUserHasWorkspace,
  updateUserHasWorkspace,
  deleteUserHasWorkspace,
} from '@service/UserHasWorkspaceService';

const userHasWorkspaceRouter = Router();

userHasWorkspaceRouter.get('/', getUserHasWorkspace);
userHasWorkspaceRouter.put('/:id', updateUserHasWorkspace);
userHasWorkspaceRouter.delete('/:id', deleteUserHasWorkspace);

export default userHasWorkspaceRouter;
