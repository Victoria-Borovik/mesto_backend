declare global {
  export namespace Express {
    export interface Request {
      user?: {
        _id: string;
      };
    }
  }
}

export {};
