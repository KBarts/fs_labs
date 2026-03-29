import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import type { Department } from "../data/departments";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function getDepartments(): Promise<Department[]> {
  const departments = await prisma.department.findMany({
    include: {
      employees: {
        orderBy: { id: "asc" }
      }
    },
    orderBy: { id: "asc" }
  });

  return departments.map((department) => ({
    name: department.name,
    employees: department.employees.map((employee) => ({
      firstName: employee.firstName,
      lastName: employee.lastName
    }))
  }));
}

async function addEmployee(input: {
  firstName: string;
  lastName: string;
  departmentName: string;
}): Promise<Department[]> {
  const department = await prisma.department.findFirst({
    where: { name: input.departmentName }
  });

  if (!department) {
    return getDepartments();
  }

  await prisma.employee.create({
    data: {
      firstName: input.firstName,
      lastName: input.lastName,
      departmentId: department.id
    }
  });

  return getDepartments();
}

const departmentRepo = {
  getDepartments,
  addEmployee
};

export default departmentRepo;