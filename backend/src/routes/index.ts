import { Router } from "express";
import userRoutes from "./user-routes.js";
import chatRoutes from "./chat-routes.js";

const appRouter = Router();

// creating middle ware
appRouter.use("/user", userRoutes); // domain/api/v1/user --> handel request transfer to userRouters
appRouter.use("/chats", chatRoutes); // domain/api/v1/chats --> handel request transfer to chatRouters

export default appRouter;