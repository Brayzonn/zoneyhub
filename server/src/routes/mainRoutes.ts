const router = require("express").Router();
import { Request, Response, NextFunction } from 'express'

router.get('/', (req: Request, res: Response , next: NextFunction)=>{
    res.send('hey you')
})




export default router 