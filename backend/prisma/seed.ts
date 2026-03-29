/// <reference types="node" />

import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = process.env.DATABASE_URL!;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const departments = [
  {
    name: "Administration",
    employees: [
      { firstName: "Zoë", lastName: "Robins" },
      { firstName: "Madeleine", lastName: "Madden" }
    ]
  },
  {
    name: "Audit",
    employees: [
      { firstName: "Josha", lastName: "Sadowski" },
      { firstName: "Kate", lastName: "Fleetwood" }
    ]
  },
  {
    name: "Banking Operations",
    employees: [
      { firstName: "Priyanka", lastName: "Bose" },
      { firstName: "Hammed", lastName: "Animashaun" },
      { firstName: "Álvaro", lastName: "Morte" },
      { firstName: "Taylor", lastName: "Napier" },
      { firstName: "Alan", lastName: "Simmonds" }
    ]
  },
  {
    name: "Communications",
    employees: [
      { firstName: "Gil", lastName: "Cardinal" },
      { firstName: "Richard J.", lastName: "Lewis" }
    ]
  },
  {
    name: "Corporate Services",
    employees: [
      { firstName: "Randy", lastName: "Bradshaw" },
      { firstName: "Tracey", lastName: "Cook" },
      { firstName: "Lubomir", lastName: "Mykytiuk" }
    ]
  },
  {
    name: "Facilities",
    employees: [
      { firstName: "Dakota", lastName: "House" },
      { firstName: "Lori Lea", lastName: "Okemah" },
      { firstName: "Renae", lastName: "Morrisseau" },
      { firstName: "Rick", lastName: "Belcourt" }
    ]
  },
  {
    name: "Financial Services",
    employees: [
      { firstName: "Selina", lastName: "Hanusa" },
      { firstName: "Buffy", lastName: "Gaudry" },
      { firstName: "Shaneen Ann", lastName: "Fox" },
      { firstName: "Allan", lastName: "Little" },
      { firstName: "Danny", lastName: "Rabbit" }
    ]
  },
  {
    name: "Human Resources",
    employees: [
      { firstName: "Jesse Ed", lastName: "Azure" },
      { firstName: "Stacy", lastName: "Da Silva" },
      { firstName: "Vladimír", lastName: "Valenta" },
      { firstName: "Samone", lastName: "Sayeses-Whitney" },
      { firstName: "Paul", lastName: "Coeur" }
    ]
  },
  {
    name: "Information Technology",
    employees: [
      { firstName: "Graham", lastName: "Greene" },
      { firstName: "Sandika", lastName: "Evergreen" },
      { firstName: "Jennifer", lastName: "Rodriguez" }
    ]
  },
  {
    name: "IT Technician",
    employees: [
      { firstName: "Aiyana", lastName: "Littlebear" },
      { firstName: "Inara", lastName: "Thunderbird" },
      { firstName: "Kaya", lastName: "Runningbrook" },
      { firstName: "Elara", lastName: "Firehawk" },
      { firstName: "Siona", lastName: "Moonflower" },
      { firstName: "Kaiyu", lastName: "Greywolf" },
      { firstName: "Ayawamat", lastName: "Nightwind" },
      { firstName: "Tala", lastName: "Braveheart" },
      { firstName: "Iniko", lastName: "Stonebear" },
      { firstName: "Onatah", lastName: "Redhawk" }
    ]
  }
];

const roles = [
  { roleName: "CEO/Chair of Board", firstName: "Jo-Anne", lastName: "Sinclair" },
  { roleName: "COO/VP Operations", firstName: "Jackson", lastName: "Smith" },
  { roleName: "CFO/VP Administration", firstName: "Susan", lastName: "Thomas" },
  { roleName: "VP Client Services", firstName: "Richa", lastName: "Kaur" },
  { roleName: "CIO", firstName: "Josee", lastName: "Benjamin" },
  { roleName: "VP Sales & Marketing", firstName: "Vincent", lastName: "Grey" },
  { roleName: "Director Financial and Audit Svcs", firstName: "Rupa", lastName: "Kharki" },
  { roleName: "Director Human Resources", firstName: "Xun", lastName: "Kuang" },
  { roleName: "Director Legal Services/General Counsel", firstName: "Stien", lastName: "Pedersen" },
  { roleName: "Director Information Technology", firstName: "Sandra", lastName: "Bear" },
  { roleName: "Director Information Security and CISSO", firstName: "Gus", lastName: "Blue" },
  { roleName: "Director Accounting", firstName: "Sam", lastName: "Kong" },
  { roleName: "Director Physical Security", firstName: "Valentine", lastName: "Smith" },
  { roleName: "Director Facilities", firstName: "Mariya", lastName: "Kaperski" },
  { roleName: "Manager, Business Continuity and Disaster Recovery", firstName: "Abd al-Hamid", lastName: "Alami" },
  { roleName: "Manager, Internal Audit", firstName: "Victoria", lastName: "Gray" },
  { roleName: "Chief Architect", firstName: "Cheryl", lastName: "Guru" },
  { roleName: "Manager, Security Architecture", firstName: "Jean", lastName: "Ngoy" },
  { roleName: "Solution Architect, Online Banking", firstName: "Kris", lastName: "Gold" },
  { roleName: "Manager, Application Solutions", firstName: "Isaac", lastName: "Smith" },
  { roleName: "Lead Developer, Online Banking", firstName: "Payton", lastName: "Frost" },
  { roleName: "Manager, Operational Risk", firstName: "Samantha", lastName: "Nettle" },
  { roleName: "Manager, Vendor Relations", firstName: "Yolanda", lastName: "Ferreira" },
  { roleName: "Manager, Purchasing", firstName: "Samir", lastName: "Hassan" },
  { roleName: "Manager, Communications", firstName: "Yuna", lastName: "Aikawa" },
  { roleName: "Manager Customer Experience and Community Eng.", firstName: "Jonathan", lastName: "Carberry" },
  { roleName: "Manager of Sales", firstName: "Roland", lastName: "Wei" },
  { roleName: "Manager, Marketing", firstName: "Pran", lastName: "Singh" },
  { roleName: "Business Analyst, Online Banking", firstName: "Linda", lastName: "Analyst" },
  { roleName: "Manager, Contract Management", firstName: "Esra", lastName: "Sedge" },
  { roleName: "Manager, Compliance Management", firstName: "Pranee", lastName: "Tan" },
  { roleName: "Manager IT End User Service Desk", firstName: "Karmen", lastName: "Spruce" },
  { roleName: "Manager IT End User Computing", firstName: "Haydar", lastName: "Katirci" },
  { roleName: "Manager IT Telecom and Infrastructure", firstName: "Jill", lastName: "Harkness" },
  { roleName: "Manager, Data Center and Hosting Services", firstName: "Tim", lastName: "Morrison" },
  { roleName: "Manager of IT Risk Management", firstName: "Aleksandr", lastName: "Milosevic" },
  { roleName: "Manager IT, project management office", firstName: "Jim", lastName: "Wingnut" }
];

async function main() {
  await prisma.employee.deleteMany();
  await prisma.role.deleteMany();
  await prisma.department.deleteMany();

  for (const department of departments) {
    const createdDepartment = await prisma.department.create({
      data: {
        name: department.name
      }
    });

    if (department.employees.length > 0) {
      await prisma.employee.createMany({
        data: department.employees.map((employee) => ({
          firstName: employee.firstName,
          lastName: employee.lastName,
          departmentId: createdDepartment.id
        }))
      });
    }
  }

  if (roles.length > 0) {
    await prisma.role.createMany({
      data: roles
    });
  }
}

main()
  .then(async () => {
    console.log("Database seeded");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });