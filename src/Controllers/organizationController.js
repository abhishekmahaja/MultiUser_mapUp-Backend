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

//Add department
export const addDepartment = async (req, res) => {
  try {
    const { organizationName, departmentName } = req.body;

    // Check if all fields are provided
    if (!organizationName || !departmentName) {
      return res.status(400).json({
        success: false,
        message: "Organization name and department name are required",
      });
    }

    // Find the organization by name
    const organization = await Organization.findOne({ organizationName });

    console.log("orga", organization);

    if (!organization) {
      return res.status(404).json({
        success: false,
        message: "Organization not found",
      });
    }

    console.log(organization);
    // Check if the department already exists
    const departmentExists = organization.departments.some(
      (dep) => dep.departmentName === departmentName
    );

    if (departmentExists) {
      return res.status(400).json({
        success: false,
        message: "Department already exists in this organization",
      });
    }

    // Add the new department
    organization.departments.push({ departmentName, positions: [] });

    // Save the updated organization
    await organization.save();

    return res.status(201).json({
      success: true,
      message: `Department ${departmentName} added successfully to organization ${organizationName}`,
      data: organization.departments,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message || "An error occurred while adding the department",
    });
  }
};
