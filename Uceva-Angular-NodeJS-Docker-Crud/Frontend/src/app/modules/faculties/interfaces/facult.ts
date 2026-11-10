export interface Facult {
    id: number;
    name: string;
    description: string;
    status: boolean;
}

export interface CreateFacultRequest extends Facult {}

export type UpdateFacultRequest = Omit<Facult, "id">;