import { Router } from "express";
import { jwtAuth } from "../middlewares/jwtAuth";
import { CreateShapes, DeleteRoomShape, DeleteShape, RoomShapes } from "../controllers/shape.controller";

const router:Router = Router();

router.post("/", jwtAuth, CreateShapes);
// router.get("/", jwtAuth, AllChats);
router.get("/:id", jwtAuth, RoomShapes);
// router.put("/:id", jwtAuth, UpdateChat);
router.post("/delete", jwtAuth, DeleteShape);
router.delete("/room/:id", jwtAuth, DeleteRoomShape);
// router.delete("/", jwtAuth, DeleteAllChats);

export default router;