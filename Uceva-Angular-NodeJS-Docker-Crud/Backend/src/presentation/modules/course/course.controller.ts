import { Request, Response } from "express";
import { HandleError } from "../../../domain/errors/handle.error";
import { CourseService } from "./course.service";
import { CreateCourseDTO } from "../../../domain/dtos/create-course.dto";
import { UpdateCourseDTO } from "../../../domain/dtos/update-course.dto";

export class CourseController {

    private readonly courseService = new CourseService();

    getAllCourses = (req: Request, res: Response): void => {
        this.courseService.getAllCourses()
        .then((courses) => res.status(200).json(courses))
        .catch((error) => HandleError.error(error, res));
    };

    getCourseById = (req: Request, res: Response): void => {
        const id = Number(req.params.id);
        this.courseService.getCourseById(id)
        .then((course) => res.status(200).json(course))
        .catch((error) => HandleError.error(error, res));
    }

    createCourse = (req: Request, res: Response) => {
        const [error, createCourseDTO] = CreateCourseDTO.create(req.body);
        if (error) return res.status(400).json({ error });
        this.courseService.createCourse(createCourseDTO!)
        .then((course) => res.status(201).json(course))
        .catch((error) => HandleError.error(error, res));
    };

    updateCourse = (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const [error, updateCourseDTO] = UpdateCourseDTO.create(req.body);
        if (error) return res.status(400).json({ error });
        this.courseService.updateCourse(id, updateCourseDTO!)
        .then((course) => res.status(200 ).json(course))
        .catch((error) => HandleError.error(error, res));
    };

    deleteCourse = (req: Request, res: Response) => {
        const id = Number(req.params.id);
        this.courseService.deleteCourse(id)
        .then((result) => res.status(200).json({ result }))
        .catch((error) => HandleError.error(error, res));
    };

}