import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./src/Routes/usersRoutes.js";
import Mongodb from "./src/Database/connectToDatabase.js";
import connectCloudinary from "./src/Config/cloudinary.js";
import fileUpload from "express-fileupload";
import externaldeviceRouter from "./src/Routes/externalDeviceRoutes.js";
import organizationRouter from "./src/Routes/organizationsRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;
connectCloudinary();

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/externaldevice", externaldeviceRouter);
app.use("/api/v1/organization", organizationRouter);

app.listen(PORT, () => {
  Mongodb();
  console.log(`Server is running on port ${PORT}`);
});
