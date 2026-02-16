import { NextFunction, Request, Response } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: '6992fcbd8367ec47a6049112',
  };

  next();
};
