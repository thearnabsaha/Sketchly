import { prisma } from '@workspace/db/client';
import { Request, Response } from 'express';

export const CreateChats = async (req: Request, res: Response) => {
    try {
        const user=await prisma.user.findFirst({where:{id:req.id}})
        if(!user){
            res.status(400).json({message:"User is not Valid!"})
            return;
        }
        const room=await prisma.room.findFirst({where:{slug:req.body.slug}})
        if(!room){
            res.status(400).json({message:"Room is not Valid!"})
            return;
        }
        await prisma.chat.create({data:{
            roomId:room?.id,
            message:req.body.message,
            userId:user.id
        }})
        res.status(201).json({message:"New Message Added!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}
export const AllChats = async (req: Request, res: Response) => {
    try {
        const user=await prisma.user.findFirst({where:{id:req.id}})
        if(!user){
            res.status(400).json({message:"User is not Valid!"})
            return;
        }
        const room=await prisma.room.findFirst({where:{}})
        if(!room){
            res.status(400).json({message:"Room is not Valid!"})
            return;
        }
        const allchats=await prisma.chat.findMany({where:{}})
        res.status(200).json({allchats})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}
export const UpdateChat = async (req: Request, res: Response) => {
    try {
        const user=await prisma.user.findFirst({where:{id:req.id}})
        if(!user){
            res.status(400).json({message:"User is not Valid!"})
            return;
        }
        const room=await prisma.room.findFirst({where:{slug:req.body.slug}})
        if(!room){
            res.status(400).json({message:"Room is not Valid!"})
            return;
        }
        await prisma.chat.update({
            where: {
                id: Number(req.params.id),
            },
            data: {
                message: req.body.message
            },
        });
        res.status(200).json({message:"chat Updated Successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}
export const RoomChats = async (req: Request, res: Response) => {
    try {
        const user=await prisma.user.findFirst({where:{id:req.id}})
        if(!user){
            res.status(400).json({message:"User is not Valid!"})
            return;
        }
        const room=await prisma.room.findFirst({where:{slug:req.params.id}})
        if(!room){
            res.status(400).json({message:"Room is not Valid!"})
            return;
        }
        const allchats=await prisma.chat.findMany({where:{roomId:room.id}})
        res.status(200).json({allchats})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}
export const DeleteChat = async (req: Request, res: Response) => {
    try {
        const user=await prisma.user.findFirst({where:{id:req.id}})
        if(!user){
            res.status(400).json({message:"User is not Valid!"})
            return;
        }
        const room=await prisma.room.findFirst({where:{}})
        if(!room){
            res.status(400).json({message:"Room is not Valid!"})
            return;
        }
        await prisma.chat.delete({
            where: {
                id: Number(req.params.id),
            },
        });
        res.status(200).json({message:"Message is Deleted!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}
export const DeleteRoomChat = async (req: Request, res: Response) => {
    try {
        const user=await prisma.user.findFirst({where:{id:req.id}})
        if(!user){
            res.status(400).json({message:"User is not Valid!"})
            return;
        }
        const room=await prisma.room.findFirst({where:{slug:req.params.id}})
        if(!room){
            res.status(400).json({message:"Room is not Valid!"})
            return;
        }
        const allchats=await prisma.chat.deleteMany({where:{roomId:room.id}})
        res.status(200).json({allchats})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}
export const DeleteAllChats = async (req: Request, res: Response) => {
    try {
        const user=await prisma.user.findFirst({where:{id:req.id}})
        if(!user){
            res.status(400).json({message:"User is not Valid!"})
            return;
        }
        const room=await prisma.room.findFirst({where:{}})
        if(!room){
            res.status(400).json({message:"Room is not Valid!"})
            return;
        }
        const allchats=await prisma.chat.deleteMany({where:{}})
        res.status(200).json({allchats})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}
