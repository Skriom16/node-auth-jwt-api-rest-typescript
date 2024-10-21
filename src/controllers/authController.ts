import { Request, Response } from "express";
import { hashPassword } from "../services/password.service";
import prisma from '../models/user'
import { generateToken } from "../services/auth.service";


export const register = async (req: Request, res: Response): Promise<void> => {

    const { email, password } = req.body;

    try {
        if(!email) throw new Error('El email es obligatorio')
        if(!password) throw new Error('El password es obligatorio')
        const hashedPassword = await hashPassword(password)
        console.log(hashPassword)

        const user = await prisma.create(
            {
                data: {
                    email,
                    password: hashedPassword
                }
            }
        )

        const token = generateToken(user)
        res.status(201).json({ token })


    } catch (error) {

        console.log(error)

        if(!email){
            res.status(400).json({ message: 'El email es obligatorio ' })
        }
        if(!password){
            res.status(400).json({ message: 'El password es obligatorio ' })
        }

        console.log(error)
        res.status(500).json({ error: 'Hubo un error en el registro' })

    }
}