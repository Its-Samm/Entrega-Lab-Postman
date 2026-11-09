export interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  birthdate: Date;
  semester: number;
  status: boolean;
}

export interface CreateStudent extends Student {}

export type UpdateStudent = Omit<Student, "id">;