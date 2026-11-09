import { CreateFacult, Facult, UpdateFacult } from "../../../domain/interfaces/facult.interface";
import { pool } from "../../../config/database";
import { CustomError } from "../../../domain/errors/custom.error";

export class FacultService {

    public async getAllFaculties(): Promise<Facult[]> {
        const sql = `SELECT * FROM faculties;`;
        const faculties = await pool.query(sql);
        return faculties.rows;
    }

    public async getFacultById(id: number): Promise<Facult | null> {
        const sql = `SELECT * FROM faculties WHERE id = $1;`;
        const facult = (await pool.query<Facult>(sql, [id])).rows[0];
        return facult ?? null;
    }

    public async createFacult(facult: CreateFacult): Promise<Facult> {
        const sql = `
            INSERT INTO faculties (
                id,
                name,
                description,
                status
            )
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const values = [
            facult.id,
            facult.name,
            facult.description,
            facult.status
        ];
        const facultCreated = (await pool.query<Facult>(sql, values)).rows[0];
        if(!facultCreated) {
            throw CustomError.internalServer(`No se pudo crear la facultad`);
        }
        return facultCreated;
    }

    public async updateFacult(
        id: number,
        facult: UpdateFacult
    ): Promise<Facult> {
        const existingFacult = await this.getFacultById(id);
        if(!existingFacult) {
            throw CustomError.internalServer(`No existe un facultad con ese id`);
        }
        const sql = `
            UPDATE faculties
            SET
                name = $1,
                description = $2,
                status = $3
            WHERE id = $4
            RETURNING *;
        `;
        const values = [
            facult.name,
            facult.description,
            facult.status,
            id,
        ];
        const facultUpdated = (await pool.query<Facult>(sql, values)).rows[0];
        if(!facultUpdated) {
            throw CustomError.internalServer(`No se pudo actualizar la facultad`);
        }
        return facultUpdated;
    }

    public async deletefacult(id: number): Promise<boolean> {
        const existingFacult = await this.getFacultById(id);
        if(!existingFacult) {
            throw CustomError.internalServer(`No existe una facultad con ese id`);
        }
        const sql = `
            DELETE FROM faculties
            WHERE id = $1
            RETURNING id;
        `;
        const facultDeleted = await pool.query(sql, [id]);
        if(!facultDeleted) {
            throw CustomError.internalServer(`No se pudo eliminar la facultad`);
        }
        return facultDeleted.rowCount !== null && facultDeleted.rowCount > 0;
    }

}

