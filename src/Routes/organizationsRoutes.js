import express from "express";
import {
  departmentBaseOrgNameDropdown,
  organizationDropDown,
} from "../Controllers/organizationController.js";

const organizationRouter = express.Router();
organizationRouter.get("/organization-drop-down", organizationDropDown);
organizationRouter.post(
  "/department-base-org-name-dropdown",
  departmentBaseOrgNameDropdown
);

export default organizationRouter;
