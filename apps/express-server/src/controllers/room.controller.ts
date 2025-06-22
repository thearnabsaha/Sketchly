import { prisma } from '@workspace/db/client';
import { Request, Response } from 'express';

export const CreateRoom = async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.findFirst({ where: { id: req.id } })
        if (!user) {
            res.status(400).json({ message: "User is not Valid!" })
            return;
        }
        const room = await prisma.room.findFirst({ where: { slug: req.body.slug } })
        if (room) {
            res.status(411).json({ message: "This Room Already Exists!" })
            return;
        }
        const newRoom = await prisma.room.create({
            data: {
                slug: req.body.slug,
                adminId: user?.id
            }
        })
        res.status(201).json({ message: newRoom.slug + " is created!" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
}
export const FindRooms = async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.findFirst({ where: { id: req.id } })
        if (!user) {
            res.status(400).json({ message: "User is not Valid!" })
            return;
        }
        const room = await prisma.room.findMany({ where: { adminId:user.id } })
        if (!room) {
            res.status(404).json({ message: "No Such room Exists" })
            return;
        }
        res.status(200).json({ room })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
}
export const FindRoom = async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.findFirst({ where: { id: req.id } })
        if (!user) {
            res.status(400).json({ message: "User is not Valid!" })
            return;
        }
        const room = await prisma.room.findFirst({ where: { slug:req.params.id } })
        if (!room) {
            res.status(404).json({ message: "No Such Room Exists" })
            return;
        }
        res.status(200).json({ room })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
}
export const UpdateRoom = async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.findFirst({ where: { id: req.id } })
        if (!user) {
            res.status(400).json({ message: "User is not Valid!" })
            return;
        }
        const room = await prisma.room.findFirst({ where: { slug:req.params.id } })
        if (!room) {
            res.status(404).json({ message: "No Such Room Exists" })
            return;
        }
        await prisma.room.update({
            where: {
                slug: req.params.id,
            },
            data: {
                slug: req.body.slug
            },
        });
        res.status(200).json({ message:"Room "+ req.params.id +" Updated Successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
}
export const DeleteRoom = async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.findFirst({ where: { id: req.id } })
        if (!user) {
            res.status(400).json({ message: "User is not Valid!" })
            return;
        }
        const room = await prisma.room.findFirst({ where: { slug:req.params.id } })
        if (!room) {
            res.status(404).json({ message: "No Such Room Exists" })
            return;
        }
        await prisma.room.delete({
            where: {
                slug: req.params.id,
            },
        });

        res.status(200).json({ message:"Room "+ req.params.id +" Deleted Successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
}
export const DeleteRooms = async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.findFirst({ where: { id: req.id } })
        if (!user) {
            res.status(400).json({ message: "User is not Valid!" })
            return;
        }
        await prisma.room.deleteMany({
            where: {
                adminId: user.id,
            },
        });
        res.status(200).json({ message:"User "+ user.name +" Deleted All Rooms Successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
}
