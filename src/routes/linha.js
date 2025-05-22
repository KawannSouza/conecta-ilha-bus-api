import { Router } from 'express';
import { getLines, getLineByCode, feedbackLine, getFeedbacks } from '../controllers/linha.js';


const router = Router();

router.get("/", getLines);

router.get("/feedbacks", getFeedbacks)

router.post("/feedback/:id", feedbackLine);

router.get("/:code", getLineByCode);

export default router;