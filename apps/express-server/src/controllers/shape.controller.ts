import { prisma } from '@workspace/db/client';
import { Request, Response } from 'express';

export const CreateShapes = async (req: Request, res: Response) => {
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
        await prisma.shape.create({data:{
            roomId:room?.id,
            userId:user.id,
            type:req.body.type,
            width:req.body.width,
            height:req.body.height,
            pencilPoints:req.body.pencilPoints,
            x:req.body.x,
            y:req.body.y
        }})
        res.status(201).json({message:"New Message Added!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}

export const RoomShapes = async (req: Request, res: Response) => {
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
        const allshapes=await prisma.shape.findMany({where:{roomId:room.id}})
        res.status(200).json({allshapes})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}
