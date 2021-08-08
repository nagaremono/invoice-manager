import { RequestHandler } from 'express';
import invoiceService from '../services/invoice.service';

export const getInvoices: RequestHandler = async (req, res, next) => {
  try {
    const result = await invoiceService.getInvoices(
      Number(req.query.take) || undefined,
      Number(req.query.page) || undefined
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export default {
  getInvoices,
};
