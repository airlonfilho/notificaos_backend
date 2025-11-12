export interface IServiceOrder {
  _id: string;
  organizationId: string;
  humanId: string;
  status: string;
  client: {
    name: string;
    phone: string;
  };
  equipment: {
    brand: string;
    model: string;
    problemReported: string;
  };
  observedState?: string[] | undefined;
  accessories?: string[] | undefined;
  notes?: string | undefined;
  createdAt: Date;
  updatedAt: Date;
}

