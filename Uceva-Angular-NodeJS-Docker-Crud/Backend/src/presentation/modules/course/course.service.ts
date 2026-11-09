import { pool } from "../../../config/database";
import { CustomError } from "../../../domain/errors/custom.error";
import { Course, CreateCourse, UpdateCourse } from "../../../domain/interfaces/course.interface";

export class CourseService {

    public async getAllCourses(): Promise<Course[]> {
        const sql = `SELECT * FROM courses;`;
        const courses = await pool.query(sql);
        return courses.rows;
    }

    public async getCourseById(id: number): Promise<Course | null> {
        const sql = `SELECT * FROM courses WHERE id = $1;`;
        const course = (await pool.query<Course>(sql, [id])).rows[0];
        return course ?? null;
    }

    public async createCourse(course: CreateCourse): Promise<Course> {
        const sql = `
            INSERT INTO courses (
                name,
                description,
                credits,
                semester,
                status
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
        const values = [
            course.name,
            course.description,
            course.credits,
            course.semester,
            course.status
        ];
        const courseCreated = (await pool.query<Course>(sql, values)).rows[0];
        if(!courseCreated) {
            throw CustomError.internalServer(`No se pudo crear el curso`);
        }
        return courseCreated;
    }

    public async updateCourse(
        id: number,
        course: UpdateCourse
    ): Promise<Course> {
        const existingCourse = await this.getCourseById(id);
        if(!existingCourse) {
            throw CustomError.internalServer(`No existe un curso con ese id`);
        }
        const sql = `
            UPDATE courses
            SET
                name = $1,
                description = $2,
                credits = $3,
                semester = $4,
                status = $5
            WHERE id = $6
            RETURNING *;
        `;
        const values = [
            course.name,
            course.description,
            course.credits,
            course.semester,
            course.status,
            id,
        ];
        const courseUpdated = (await pool.query<Course>(sql, values)).rows[0];
        if(!courseUpdated) {
            throw CustomError.internalServer(`No se pudo actualizar el curso`);
        }
        return courseUpdated;
    }

    public async deleteCourse(id: number): Promise<boolean> {
        const existingCourse = await this.getCourseById(id);
        if(!existingCourse) {
            throw CustomError.internalServer(`No existe un curso con ese id`);
        }
        const sql = `
            DELETE FROM courses
            WHERE id = $1
            RETURNING id;
        `;
        const courseDeleted = await pool.query(sql, [id]);
        if(!courseDeleted) {
            throw CustomError.internalServer(`No se pudo eliminar el curso`);
        }
        return courseDeleted.rowCount !== null && courseDeleted.rowCount > 0;
    }

}