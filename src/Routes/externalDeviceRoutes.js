import express from "express";
import { liveDataShow } from "../Controllers/externalDevicesControllers.js";

const externaldeviceRouter = express.Router();

//routes to call api of external
externaldeviceRouter.get("/live-data-show", liveDataShow);

export default externaldeviceRouter;
