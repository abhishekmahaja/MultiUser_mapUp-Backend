import Organization from "../Models/organizationModel.js";

// Organization Update Data API
export const organizationUpdateData = async (req, res) => {
  const { organizationName, address, city, state, country, pinCode, phone, fax } = req.body;
  try {
    const organization = await Organization.findOneAndUpdate(
      { organizationName }, // Matching by name
      { address, city, state, country, pinCode, phone, fax }, 
      { new: true, upsert: true } // Options: return updated document or create a new one if it doesn't exist
    );
    res.json({
      success: true,
      data: organization,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error updating organization data",
    });
  }
};

// Department Add Data API
export const organizationAddDepartmentData = async (req, res) => {
  const { OrganizationName, department } = req.body;
  try {
    const organization = await Organization.findOneAndUpdate(
      { organizationName },
      { $push: { departments: department } },
      { new: true }
    );
    res.json({
      success: true,
      data: organization,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error adding department",
    });
  }
};

// Position Add Data API
export const organizationAddPositionData = async (req, res) => {
  const { OrganizationName, position } = req.body;
  try {
    const organization = await Organization.findOneAndUpdate(
      { organizationName },
      { $push: { positions: position } },
      { new: true }
    );
    res.json({
      success: true,
      data: organization,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error adding position",
    });
  }
};

// Approval Chain Add Data API
export const organizationAddApprovalChainData = async (req, res) => {
  const { OrganizationName, action, level1, level2 } = req.body;
  try {
    const organization = await Organization.findOneAndUpdate(
      { organizationName },
      { $push: { approvalChain: { action, level1, level2 } } },
      { new: true }
    );
    res.json({
      success: true,
      data: organization,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error adding approval chain",
    });
  }
};
