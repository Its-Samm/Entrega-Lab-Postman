import { Request, Response } from "express";
import { HandleError } from "../../../domain/errors/handle.error";
import { StudentService } from "./student.service";
import { CreateStudentDTO } from "../../../domain/dtos/create-student.dto";
import { UpdateStudentDTO } from "../../../domain/dtos/update-student.dto";

export class StudentController {

  private readonly studentService = new StudentService();

  getAllStudents = (req: Request, res: Response): void => {
    this.studentService.getAllStudents()
    .then((students) => res.status(200).json(students))
    .catch((error) => HandleError.error(error, res));
  };

  getStudentById = (req: Request, res: Response): void => {
    const id = Number(req.params.id);
    this.studentService.getStudentById(id)
    .then((student) => res.status(200).json(student))
    .catch((error) => HandleError.error(error, res));
  }

  createStudent = (req: Request, res: Response) => {
    const [error, createStudentDTO] = CreateStudentDTO.create(req.body);
    if (error) return res.status(400).json({ error });
    this.studentService.createStudent(createStudentDTO!)
    .then((student) => res.status(201).json(student))
    .catch((error) => HandleError.error(error, res));
  };

  updateStudent = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const [error, updateStudentDTO] = UpdateStudentDTO.create(req.body);
    if (error) return res.status(400).json({ error });
    this.studentService.updateStudent(id, updateStudentDTO!)
    .then((student) => res.status(200 ).json(student))
    .catch((error) => HandleError.error(error, res));
  };

  deleteStudent = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    this.studentService.deleteStudent(id)
    .then((result) => res.status(200).json({ result }))
    .catch((error) => HandleError.error(error, res));
  };

}
