import { getLines, getLineByCode } from "../controllers/linha";
import { Router } from "express";

const router = Router();

router.get("/", getLines);

router.get("/:code", getLineByCode);

export default router;