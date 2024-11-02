import Organization from "../Models/organizationModel.js";
import bcrypt from "bcryptjs";
import { AwsInstance } from "twilio/lib/rest/accounts/v1/credential/aws.js";

//ADMIN TO CREATE ORGANIZATION

//Organization Dropdown
export const organizationDropDown = async (req, res) => {
  try {
    // Fetch only the 'organizationName' field
    const organizationName = await Organization.find().select(
      "organizationName"
    );

    res.status(200).json({
      success: true,
      message: "All Organization Name Fetch Successfully",
      data: organizationName,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error Fetching Organization Name",
    });
  }
};

//Department Dropdown on the base of orgnaziation name (also get department api)
export const departmentBaseOrgNameDropdown = async (req, res) => {
  try {
    const { organizationName } = req.body;
    const departmentdropdown = await Organization.find({
      organizationName,
    }).select("departments");

    res.status(200).json({
      success: true,
      message:
        "All Department Name Fetch Successfully on the base of Organization",
      data: departmentdropdown,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error Fetching Department Name",
    });
  }
};
