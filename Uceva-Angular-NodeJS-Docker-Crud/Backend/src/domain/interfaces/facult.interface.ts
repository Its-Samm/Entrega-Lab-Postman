export interface Facult {
  id: number;
  name: string;
  description: string;
  status: boolean;
}

export interface CreateFacult extends Facult {}

export type UpdateFacult = Omit<Facult, "id">;