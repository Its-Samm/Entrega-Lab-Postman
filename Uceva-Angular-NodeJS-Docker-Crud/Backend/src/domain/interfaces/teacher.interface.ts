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

export interface CreateTeacher extends Teacher {}

export type UpdateTeacher = Omit<Teacher, "id">;