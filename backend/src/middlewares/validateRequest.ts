// src/middlewares/validateRequest.ts
import { validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg })
  }

  next()
}
