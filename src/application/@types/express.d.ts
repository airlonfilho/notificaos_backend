declare namespace Express {
  export interface Request {
    metadata?: {
      organization?: {
        id: number;
        loginPhone: string;
        plan: string;
      };
    };
  } 
}

