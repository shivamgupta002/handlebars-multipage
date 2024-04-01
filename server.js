import express from "express";
import exphbs from "express-handlebars";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url"; // Import fileURLToPath function
import templateRoutes from "./routes/templatesRoutes.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hbs = exphbs.create({
  defaultLayout: "main",
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, "public")));

let allData;

app.use("/:username", async (req, res, next) => {
  const { username } = req.params;
  try {
    const response = await axios.get(`http://localhost:5000/getProfile/${username}`);
    req.apiData = response.data; // Attach fetched data to req object
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    res.status(500).send("Error fetching data from API");
  }
});

app.get("/:username", (req, res) => {
  const { apiData } = req; // Access the fetched data from req object
  allData = apiData;
  const templateId = allData.home.templateId;
  // console.log(allData);
  // console.log(templateId);
  const templateDirectory = "templates";
  let templateFilePath;
  if (templateId === "1") {
    templateFilePath = "template3/template3";
    // templateFilePath = "template1/template_1";
    // templateFilePath = "template2/template_2";
  } else if (templateId === "2") {
    templateFilePath = "template2/template_2";
  }
  const fileName = path.join(templateDirectory, templateFilePath);

  res.render(fileName, {
    allData: allData, // Pass only the response data to the template
  });
});

app.get("/:username/about",(req,res)=>{
  const { apiData } = req; // Access the fetched data from req object
  allData = apiData;
  const templateDirectory = "templates";
  let templateFilePath;
  const templateId = allData.home.templateId;

  if (templateId === "1") {
    templateFilePath = "template1/about";
  } else if (templateId === "2") {
    templateFilePath = "template2/about";
  }
  const fileName = path.join(templateDirectory, templateFilePath);

  res.render(fileName, {
    allData: allData, // Pass only the response data to the template
  });
})

app.get("/:username/service",(req,res)=>{
  const { apiData } = req; // Access the fetched data from req object
  allData = apiData;
  const templateDirectory = "templates";
  let templateFilePath;
  const templateId = allData.home.templateId;

  if (templateId === "1") {
    templateFilePath = "template1/service";
  } else if (templateId === "2") {
    templateFilePath = "template2/service";
  }
  const fileName = path.join(templateDirectory, templateFilePath);

  res.render(fileName, {
    allData: allData, // Pass only the response data to the template
  });
})

app.get("/", (req, res) => {
  res.render("home", { title: "Home" });
});

// app.get("/about", (req, res) => {
//   res.render("about", { title: "About Us" });
// });

// Define routes
app.use("/", templateRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
