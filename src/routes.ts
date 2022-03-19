import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController";
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController copy";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUsersController } from "./controllers/ListUsersController";


const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserSendComplimentsController = new ListUserSendComplimentsController();
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

router.post("/tags", ensureAuthenticated, ensureAdmin, createTagController.handle); // criar tag

router.get("/tags", ensureAuthenticated, listTagsController.handle )

router.post("/users", createUserController.handle); // criar user
router.post("/login", authenticateUserController.handle); //login
router.post("/compliments", ensureAuthenticated ,createComplimentController.handle) // mandar elogios

router.get("/users/compliments/send", ensureAuthenticated ,listUserSendComplimentsController.handle ) // listar elogios enviados
router.get("/users/compliments/receive", ensureAuthenticated, listUserReceiveComplimentsController.handle )// listar elogios recebidos

router.get("/users", ensureAuthenticated ,listUsersController.handle)



export { router }