import { Router } from "express";
import { jwtAuth } from "../middlewares/jwtAuth";
import { CreateRoom, DeleteRoom, DeleteRooms, FindRoom, FindRooms, UpdateRoom } from "../controllers/room.controller";

const router: Router = Router();

router.post("/", jwtAuth, CreateRoom);
router.get("/", jwtAuth, FindRooms);
router.get("/:id", jwtAuth, FindRoom);
router.put("/:id", jwtAuth, UpdateRoom);
router.delete("/:id", jwtAuth, DeleteRoom);
router.delete("/", jwtAuth, DeleteRooms);

export default router;