import { Router } from "express";
import { StudentController } from "./student.controller";

export class StudentRoutes {

  static get routes(): Router {
    const router = Router();
    const controller = new StudentController();

    router.get("/", controller.getAllStudents);
    router.get("/:id", controller.getStudentById);
    router.post("/", controller.createStudent);
    router.put("/:id", controller.updateStudent);
    router.delete("/:id", controller.deleteStudent);

    return router;
  }
}