import fs from "fs";
import csv from "csv-parser";
import moment from "moment";

export const liveDataShow = async (req, res) => {
  const results = [];
  const filePath = process.env.CSV_FILE_PATH || "src/Data/mapUp_stock_data.csv";

  try {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        results.push({
          ...data,
          Open: parseFloat(data.Open),
          High: parseFloat(data.High),
          Low: parseFloat(data.Low),
          Close: parseFloat(data.Close),
          Volume: parseInt(data.Volume, 10),
          OpenInt: parseInt(data.OpenInt, 10),
          Date: moment(data.Date, "YYYY-MM-DD"),
        });
      })
      .on("end", () => {
        // Find the last date in the existing data
        const lastDate = moment.max(results.map((result) => result.Date));
        const today = moment();

        // Generate missing daily data from last date to today
        while (lastDate.isBefore(today, "day")) {
          lastDate.add(1, "days");

          // Create a mock daily data object
          const newData = {
            Date: lastDate.format("YYYY-MM-DD"),
            Open: Math.random() * 10 + 12,
            High: Math.random() * 10 + 12,
            Low: Math.random() * 10 + 12,
            Close: Math.random() * 10 + 12,
            Volume: Math.floor(Math.random() * 1000),
            OpenInt: Math.floor(Math.random() * 1000),
          };

          results.push(newData);
        }

        // Sort results by date (optional, if you want them ordered)
        results.sort((a, b) => moment(a.Date).diff(moment(b.Date)));

        res.status(200).json({
          success: true,
          message: "Data Fetch Successfully",
          data: results,
        });
      })
      .on("error", (error) => {
        console.error("Error reading the CSV file:", error);
        res.status(500).json({
          success: false,
          message: "Internal Server Error",
        });
      });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
