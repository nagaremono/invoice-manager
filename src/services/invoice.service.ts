import { Invoice, PrismaClient } from '@prisma/client';
import { PaginatedResult } from '../types/paginatedResult';

const prisma = new PrismaClient();

const getInvoices = async (
  take: number | undefined = 10,
  page: number | undefined = 1
): Promise<PaginatedResult<Invoice>> => {
  const invoicesCount = await prisma.invoice.count();
  const invoices = await prisma.invoice.findMany({
    take,
    skip: take * (page - 1),
    include: {
      soldItem: true,
      salesPerson: true,
      customer: true,
    },
    orderBy: {
      transactionDate: 'desc',
    },
  });

  return {
    data: invoices,
    page,
    pages: invoicesCount / take,
    total: invoicesCount,
    take,
  };
};

export default {
  getInvoices,
};
