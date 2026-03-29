import { Request, Response } from "express";
import roleService from "../services/roleService";

async function getRoles(_req: Request, res: Response) {
  const data = await roleService.getRoles();
  res.json(data);
}

async function createRole(req: Request, res: Response) {
  const result = await roleService.createRole(req.body);
  res.json(result);
}

const roleController = {
  getRoles,
  createRole
};

export default roleController;