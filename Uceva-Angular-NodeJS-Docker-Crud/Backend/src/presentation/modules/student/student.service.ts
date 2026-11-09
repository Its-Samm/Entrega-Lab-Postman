import { pool } from "../../../config/database";
import { CustomError } from "../../../domain/errors/custom.error";
import { CreateStudent, Student, UpdateStudent } from "../../../domain/interfaces/student.interface";

export class StudentService {

    public async getAllStudents(): Promise<Student[]> {
        const sql = `SELECT * FROM students;`;
        const students = await pool.query(sql);
        return students.rows;
    }

    public async getStudentById(id: number): Promise<Student | null> {
        const sql = `SELECT * FROM students WHERE id = $1;`;
        const student = (await pool.query<Student>(sql, [id])).rows[0];
        return student ?? null;
    }

    public async createStudent(student: CreateStudent): Promise<Student> {
        const existingStudent = await this.getStudentById(student.id);
        if(existingStudent) {
            throw CustomError.internalServer(`Ya existe un estudiante con ese id`);
        }
        const sql = `
            INSERT INTO students (
                id,
                name,
                email,
                phone,
                address,
                birthdate,
                semester,
                status
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `;
        const values = [
            student.id,
            student.name,
            student.email,
            student.phone,
            student.address,
            student.birthdate,
            student.semester,
            student.status
        ];
        const studentCreated = (await pool.query<Student>(sql, values)).rows[0];
        if(!studentCreated) {
            throw CustomError.internalServer(`No se pudo crear el estudiante`);
        }
        return studentCreated;
    }

    public async updateStudent(
        id: number,
        student: UpdateStudent
    ): Promise<Student> {
        const existingStudent = await this.getStudentById(id);
        if(!existingStudent) {
            throw CustomError.internalServer(`No existe un estudiante con ese id`);
        }
        const sql = `
            UPDATE students
            SET
                name = $1,
                email = $2,
                phone = $3,
                address = $4,
                birthdate = $5,
                semester = $6,
                status = $7
            WHERE id = $8
            RETURNING *;
        `;
        const values = [
            student.name,
            student.email,
            student.phone,
            student.address,
            student.birthdate,
            student.semester,
            student.status,
            id,
        ];
        const studentUpdated = (await pool.query<Student>(sql, values)).rows[0];
        if(!studentUpdated) {
            throw CustomError.internalServer(`No se pudo actualizar el estudiante`);
        }
        return studentUpdated;
    }

    public async deleteStudent(id: number): Promise<boolean> {
        const existingStudent = await this.getStudentById(id);
        if(!existingStudent) {
            throw CustomError.internalServer(`No existe un estudiante con ese id`);
        }
        const sql = `
            DELETE FROM students
            WHERE id = $1
            RETURNING id;
        `;
        const studentDeleted = await pool.query(sql, [id]);
        if(!studentDeleted) {
            throw CustomError.internalServer(`No se pudo eliminar el estudiante`);
        }
        return studentDeleted.rowCount !== null && studentDeleted.rowCount > 0;
    }

}