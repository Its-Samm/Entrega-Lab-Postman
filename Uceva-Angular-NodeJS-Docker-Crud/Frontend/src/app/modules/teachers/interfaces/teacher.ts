export interface Teacher {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    birthdate: Date;
    role: string;
    status: boolean;
}

export interface CreateTeacherRequest extends Teacher {}

export type UpdateTeacherRequest = Omit<Teacher, "id">;