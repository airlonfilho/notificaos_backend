declare namespace Express {
  export interface Request {
    metadata?: {
      organization?: {
        id: string;
        loginPhone: string;
        plan: string;
      };
    };
  } 
}

