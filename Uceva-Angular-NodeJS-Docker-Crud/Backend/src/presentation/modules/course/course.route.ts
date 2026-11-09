import { Router } from "express";
import { CourseController } from "./course.controller";

export class CourseRoutes {

  static get routes(): Router {
    const router = Router();
    const controller = new CourseController();

    router.get("/", controller.getAllCourses);
    router.get("/:id", controller.getCourseById);
    router.post("/", controller.createCourse);
    router.put("/:id", controller.updateCourse);
    router.delete("/:id", controller.deleteCourse);

    return router;
  }
}