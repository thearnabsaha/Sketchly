import { Router } from "express";
import { jwtAuth } from "../middlewares/jwtAuth";
import { AllChats, CreateChats, DeleteAllChats, DeleteChat, DeleteRoomChat, RoomChats, UpdateChat } from "../controllers/chat.controller";

const router = Router();

router.post("/", jwtAuth, CreateChats);
router.get("/", jwtAuth, AllChats);
router.get("/:id", jwtAuth, RoomChats);
router.put("/:id", jwtAuth, UpdateChat);
router.delete("/:id", jwtAuth, DeleteChat);
router.delete("/room/:id", jwtAuth, DeleteRoomChat);
router.delete("/", jwtAuth, DeleteAllChats);

export default router;