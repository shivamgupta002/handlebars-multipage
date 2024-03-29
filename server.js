import express from "express";
import exphbs from "express-handlebars";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url"; // Import fileURLToPath function
import templateRoutes from "./routes/templatesRoutes.js";
import fs from "fs";
import Handlebars from "handlebars";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templateFilePath = path.join(
  __dirname,
  "./views/templates/template1/template_1.handlebars"
);

app.use(express.static(path.join(__dirname, "public")));

let homePageData;
app.use("/data/:username", async (req, res, next) => {
  const { username } = req.params;
  try {
    const response = await axios.get(`http://localhost:5000/data/${username}`);
    req.apiData = response.data; // Attach fetched data to req object
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    res.status(500).send("Error fetching data from API");
  }
});

// Read the Handlebars template file
const templateSource = fs.readFileSync(templateFilePath, "utf8");

// Compile the template
const template = Handlebars.compile(templateSource);

// Read the JSON data
const jsonData = fs.readFileSync("./constants/demo.json", "utf8");

// Parse the JSON data
const demoData = JSON.parse(jsonData);

// Render the template with the JSON data
const renderedHtml = template(demoData);
// Output the rendered HTML
// console.log(renderedHtml);

const hbs = exphbs.create({
  defaultLayout: "main",
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// fetching data of username
app.get("/data/:username", (req, res) => {
  const { username } = req.params;
  const { apiData } = req; // Access the fetched data from req object
  // Render the template with the fetched data
  homePageData = apiData;
  res.render("templates/template2/template_2", {
    homePageData: homePageData, // Pass only the response data to the template
  });
  // res.send(renderedHtml);
});

app.get("/", (req, res) => {
  res.render("home", { title: "Home" });
  // res.render("home", { title: "Home", renderedHtml });
  // res.send(renderedHtml);
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Us" });
});

// Define routes
app.use("/", templateRoutes);
// app.use("/", pagesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
