import express from 'express';
import invoiceController from '../../controllers/invoice.controller';

const router = express.Router();

router.get('/', invoiceController.getInvoices);

export default router;
