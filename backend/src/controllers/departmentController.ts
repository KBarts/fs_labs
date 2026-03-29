import { Request, Response } from "express";
import departmentService from "../services/departmentService";

async function getDepartments(_req: Request, res: Response) {
  const data = await departmentService.getDepartments();
  res.json(data);
}

async function createEmployee(req: Request, res: Response) {
  const result = await departmentService.createEmployee(req.body);
  res.json(result);
}

const departmentController = {
  getDepartments,
  createEmployee
};

export default departmentController;