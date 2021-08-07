import express from 'express';
import invoiceRoute from './invoice.route';

const router = express.Router();

router.use('/invoices', invoiceRoute);

export default router;
