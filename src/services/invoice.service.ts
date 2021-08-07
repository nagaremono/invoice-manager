import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getInvoices = (): ReturnType<typeof prisma.invoice.findMany> => {
  return prisma.invoice.findMany({
    include: {
      soldItem: true,
      salesPerson: true,
      customer: true,
    },
  });
};

export default {
  getInvoices,
};
