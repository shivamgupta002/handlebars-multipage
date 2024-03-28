import express from "express";
import exphbs from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url"; // Import fileURLToPath function
import templateRoutes from "./routes/templatesRoutes.js";
import pagesRoutes from "./routes/pagesRoutes.js";
import fs from "fs";
import Handlebars from "handlebars";
import { homePage as data } from "./constants/constant.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templateFilePath = path.join(
  __dirname,
  "./views/templates/template1/template_1.handlebars"
);

// Read the Handlebars template file
const templateSource = fs.readFileSync(templateFilePath, "utf8");
// console.log(templateSource);

// Compile the template
const template = Handlebars.compile(templateSource);
// console.log(template);

// Read the JSON data
const jsonData = fs.readFileSync("./constants/demo.json", "utf8");
// console.log(jsonData);

// Parse the JSON data
const demoData = JSON.parse(jsonData);
// console.log(demoData);
// Render the template with the JSON data
const renderedHtml = template(demoData);
// Output the rendered HTML
// console.log(renderedHtml);

const app = express();

const hbs = exphbs.create({
  defaultLayout: "main",
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "public")));

// Define routes
app.use("/", templateRoutes);
app.use("/", pagesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
