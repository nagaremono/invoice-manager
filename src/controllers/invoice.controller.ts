import { RequestHandler } from 'express';
import invoiceService from '../services/invoice.service';

export const getInvoices: RequestHandler = async (_, res, next) => {
  try {
    const result = await invoiceService.getInvoices();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export default {
  getInvoices,
};
