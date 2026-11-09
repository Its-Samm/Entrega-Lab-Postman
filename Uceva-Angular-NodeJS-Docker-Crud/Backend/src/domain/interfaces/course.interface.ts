export interface Course {
  id: number;
  name: string;
  description: string;
  credits: number;
  semester: number;
  status: boolean;
}

export type CreateCourse = Omit<Course, "id">;

export type UpdateCourse = Omit<Course, "id">;