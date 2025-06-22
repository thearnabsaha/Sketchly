import { SigninSchema, SignupSchema } from '@workspace/common/types';
import { prisma } from '@workspace/db/client';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import { JWT_SECRET } from '@workspace/backend-common/config';
import jwt from 'jsonwebtoken'

export const Server = async (req: Request, res: Response) => {
    try {
        res.send('hello from simple server :)');
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}
export const UserSignUp = async (req: Request, res: Response) => {
    try {
        const result = SignupSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json(result.error.format());
        } else {
            const user = await prisma.user.findFirst({
                where: {
                    OR: [
                        { username: req.body.username },
                        { email: req.body.email },
                    ],
                }
            })
            if (user) {
                res.status(409).json({ message: "User Already Exists!" })
                return;
            }
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            await prisma.user.create({
                data: {
                    username: req.body.username,
                    name: req.body.name,
                    photo: req.body.photo,
                    email: req.body.email,
                    password: hashedPassword,
                }
            })
            res.status(201).json({ message: "Signup Successfully!" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}
export const UserSignIn = async (req: Request, res: Response) => {
    try {
        const result = SigninSchema.safeParse(req.body);
        if (!result.success) {
            res.send(result.error.format());
        } else {
            const user = await prisma.user.findFirst({ where: { username: req.body.username } })
            var token = jwt.sign({ id: user?.id }, JWT_SECRET, { expiresIn: "1h" })
            if (!user) {
                res.status(404).json({ message: "User Doesn't Exists!" })
                return;
            }
            const isCompared = await bcrypt.compare(req.body.password, user.password)
            if (!isCompared) {
                res.status(401).json({ message: "Invalid Credentials!" });
            } else {
                res.status(200).json({ token });
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}
export const UserProfile = async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.findFirst({ where: { id: req.id } })
        res.status(200).json({ message: { id: user?.id, username: user?.username, email: user?.email,name:user?.name,photo:user?.photo } })
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}
export const HealthCheck = async (req: Request, res: Response) => {
    try {
        const start = Date.now();
        const healthcheck = {
            uptime: process.uptime(),
            message: 'OK',
            timestamp: new Date(),
            responseTime: `${Date.now() - start}ms`,
        };
        res.status(200).json(healthcheck);
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}