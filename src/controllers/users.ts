import { Request, Response } from 'express';
import User from '../models/users';
import {
  VALIDATION_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  SERVER_ERROR_CODE,
  errorText,
} from '../constants';

export const getUsers = (_: Request, res: Response) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => (
      res
        .status(SERVER_ERROR_CODE)
        .send({ message: errorText.serverFailed })
    ));
};

export const getUser = (req: Request, res: Response) => {
  User.findById(req.body.userId)
    .then((user) => {
      if (!user) {
        return res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ message: errorText.user.notFound });
      }

      return res.send({ data: user });
    })
    .catch(() => (
      res
        .status(SERVER_ERROR_CODE)
        .send({ message: errorText.serverFailed })
    ));
};

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(VALIDATION_ERROR_CODE)
          .send({ message: errorText.user.invalidCreateData });
      }

      return res
        .status(SERVER_ERROR_CODE)
        .send({ message: errorText.serverFailed });
    });
};

export const updateUser = (req: Request, res: Response) => {
  const userId = req.user?._id;
  const { name, about, avatar } = req.body;

  User.findByIdAndUpdate(userId, { name, about, avatar })
    .then((user) => {
      if (!user) {
        return res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ message: errorText.user.invalidId });
      }

      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(VALIDATION_ERROR_CODE)
          .send({ message: errorText.user.invalidUpdateData });
      }

      return res
        .status(SERVER_ERROR_CODE)
        .send({ message: errorText.serverFailed });
    });
};

export const updateAvatar = (req: Request, res: Response) => {
  const userId = req.user?._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(userId, { avatar })
    .then((user) => {
      if (!user) {
        return res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ message: errorText.user.invalidId });
      }

      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(VALIDATION_ERROR_CODE)
          .send({ message: errorText.user.invalidUpdateAvatar });
      }

      return res
        .status(SERVER_ERROR_CODE)
        .send({ message: errorText.serverFailed });
    });
};
