import { Request, Response } from "express";

export default class HelpController {

    public static getHelp(req: Request, res: Response): void {
        res.json({message: "Sorry can't help you"});
    }

}
