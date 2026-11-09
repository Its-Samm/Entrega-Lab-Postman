import { Request, Response } from "express";
import { FacultService } from "./facult.service";
import { HandleError } from "../../../domain/errors/handle.error";
import { CreateFacultDTO } from "../../../domain/dtos/create-facult.dto";
import { UpdateFacultDTO } from "../../../domain/dtos/update-facult.dto";



export class FacultController {
    
    private readonly facultService = new FacultService();

    getAllFaculties = (req: Request, res: Response): void => {
        this.facultService.getAllFaculties()
        .then((faculties) => res.status(200).json(faculties))
        .catch((error) => HandleError.error(error, res));
    };

    getFacultById = (req: Request, res: Response): void => {
        const id = Number(req.params.id);
        this.facultService.getFacultById(id)
        .then((faculties) => res.status(200).json(faculties))
        .catch((error) => HandleError.error(error, res));
    }

    createFacult = (req: Request, res: Response) => {
        const [error, createFacultDTO] = CreateFacultDTO.create(req.body);
        if (error) return res.status(400).json({ error });
        this.facultService.createFacult(createFacultDTO!)
        .then((faculties) => res.status(201).json(faculties))
        .catch((error) => HandleError.error(error, res));
    };

    updateFacult = (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const [error, updateFacultDTO] = UpdateFacultDTO.create(req.body);
        if (error) return res.status(400).json({ error });
        this.facultService.updateFacult(id, updateFacultDTO!)
        .then((faculties) => res.status(200 ).json(faculties))
        .catch((error) => HandleError.error(error, res));
    };

    deleteFacult = (req: Request, res: Response) => {
        const id = Number(req.params.id);
        this.facultService.deletefacult(id)
        .then((result) => res.status(200).json({ result }))
        .catch((error) => HandleError.error(error, res));
    };




   


}