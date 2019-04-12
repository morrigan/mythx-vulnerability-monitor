import * as express from "express";
import HelpController from "../Controller/Api/HelpController";

const router = express.Router();

router.get("/help", HelpController.getHelp);

export default router;
