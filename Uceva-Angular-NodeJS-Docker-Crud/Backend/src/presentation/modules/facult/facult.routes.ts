import { Router } from "express";
import { FacultController } from "./facult.controller";



export class FacultRoutes {

  static get routes(): Router {
    const router = Router();
    const controller = new FacultController();

    router.get("/", controller.getAllFaculties);
    router.get("/:id", controller.getFacultById);
    router.post("/", controller.createFacult);
    router.put("/:id", controller.updateFacult);
    router.delete("/:id", controller.deleteFacult);

    return router;
  }
}