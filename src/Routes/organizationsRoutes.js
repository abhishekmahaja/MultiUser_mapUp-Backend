import express from "express";
import {
  addDepartment,
  departmentBaseOrgNameDropdown,
  organizationDropDown,
} from "../Controllers/organizationController.js";

const organizationRouter = express.Router();
organizationRouter.get("/organization-drop-down", organizationDropDown);
organizationRouter.post(
  "/department-base-org-name-dropdown",
  departmentBaseOrgNameDropdown
);
organizationRouter.post("/add-department", addDepartment);

export default organizationRouter;
