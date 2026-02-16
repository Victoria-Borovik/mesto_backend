import { Request, Response } from 'express';
import Card from '../models/cards';
import {
  VALIDATION_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  SERVER_ERROR_CODE,
  errorText,
} from '../constants';

export const getCards = (_: Request, res: Response) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => (
      res
        .status(SERVER_ERROR_CODE)
        .send({ message: errorText.serverFailed })
    ));
};

export const createCard = (req: Request, res: Response) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user?._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(VALIDATION_ERROR_CODE)
          .send({ message: errorText.card.invalidCreateData });
      }

      return res
        .status(SERVER_ERROR_CODE)
        .send({ message: errorText.serverFailed });
    });
};

export const deleteCard = (req: Request, res: Response) => {
  const { cardId } = req.params;

  Card.findByIdAndDelete(cardId)
    .then((deletedCard) => {
      if (!deletedCard) {
        return res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ message: errorText.card.notFound });
      }

      return res.send({ data: deletedCard });
    })
    .catch(() => (
      res
        .status(SERVER_ERROR_CODE)
        .send({ message: errorText.serverFailed })
    ));
};

export const likeCard = (req: Request, res: Response) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user?._id } },
    { new: true },
  ).then((card) => {
    if (!card) {
      return res
        .status(NOT_FOUND_ERROR_CODE)
        .send({ message: errorText.card.invalidId });
    }

    return res.send({ data: card });
  }).catch((err) => {
    if (err.name === 'ValidationError') {
      return res
        .status(VALIDATION_ERROR_CODE)
        .send({ message: errorText.card.invalidLikeData });
    }

    return res
      .status(SERVER_ERROR_CODE)
      .send({ message: errorText.serverFailed });
  });
};

export const dislikeCard = (req: Request, res: Response) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user?._id } },
    { new: true },
  ).then((card) => {
    if (!card) {
      return res
        .status(NOT_FOUND_ERROR_CODE)
        .send({ message: errorText.card.invalidId });
    }

    return res.send({ data: card });
  }).catch((err) => {
    if (err.name === 'ValidationError') {
      return res
        .status(VALIDATION_ERROR_CODE)
        .send({ message: errorText.card.invalidLikeData });
    }

    return res
      .status(SERVER_ERROR_CODE)
      .send({ message: errorText.serverFailed });
  });
};
