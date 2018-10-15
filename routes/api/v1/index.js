import express from 'express';
// import bcrypt from 'bcrypt-nodejs';
// import UserTransformer from '../../../app/Transformers/UserTransformer';
// import UserRepository from '../../../app/Repositories/UserRepository';
// import { PENDING_USER_STATUS } from '../../../models/User';
// import { App } from '@nsilly/container';
// import { Request, AsyncMiddleware } from '@nsilly/support';
// import { ApiResponse } from '@nsilly/response';

var router = express.Router();

// async function index(req, res) {
//   const users = await App.make(UserRepository).get();
//   res.json(ApiResponse.collection(users, new UserTransformer()));
// }

// async function store(req, res) {
//   const data = {
//     email: Request.get('email'),
//     password: bcrypt.hashSync(Request.get('password'), bcrypt.genSaltSync(8), null),
//     status: PENDING_USER_STATUS
//   };
//   const user = await App.make(UserRepository).create(data);
//   res.json(ApiResponse.item(user, new UserTransformer()));
// }

// router.get('/', AsyncMiddleware(index));
// router.post('/', AsyncMiddleware(store));

export default router;
