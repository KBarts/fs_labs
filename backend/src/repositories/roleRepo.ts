import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import type { Role } from "../data/roles";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function getRoles(): Promise<Role[]> {
  const roles = await prisma.role.findMany({
    orderBy: { id: "asc" }
  });

  return roles.map((role) => ({
    firstName: role.firstName,
    lastName: role.lastName,
    roleName: role.roleName
  }));
}

async function addRole(input: {
  firstName: string;
  lastName: string;
  roleName: string;
}): Promise<Role[]> {
  await prisma.role.create({
    data: {
      firstName: input.firstName,
      lastName: input.lastName,
      roleName: input.roleName
    }
  });

  return getRoles();
}

const roleRepo = {
  getRoles,
  addRole
};

export default roleRepo;