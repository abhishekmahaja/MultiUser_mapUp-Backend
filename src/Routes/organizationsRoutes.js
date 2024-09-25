import express from "express";
import {
  createOrganization,
  departmentBaseOrgNameDropdown,
  generateOtpOragnization,
  organizationAddData,
  organizationDropDown,
  organizationGetOneData,
  organizationUpdateData,
} from "../Controllers/organizationController.js";

const organizationRouter = express.Router();

// Route to add Organization
organizationRouter.post("/organization-add-data", organizationAddData);
// Route to Update organization
organizationRouter.put("/organization-update-data/:id", organizationUpdateData);
// Route to Get Organization
organizationRouter.get(
  "/organization-get-one-data/:id",
  organizationGetOneData
);
organizationRouter.post("/generate-otp-oragnization", generateOtpOragnization);
organizationRouter.post("/create-organization", createOrganization);
organizationRouter.get("/organization-drop-down", organizationDropDown);
organizationRouter.post("/department-base-org-name-dropdown", departmentBaseOrgNameDropdown);

export default organizationRouter;
