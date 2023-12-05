import express from 'express';
import { maketranfer } from './transfer.controller.js';

export const router = express.Router();

router.post('/', maketranfer);
