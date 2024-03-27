import express from "express";
import exphbs from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url"; // Import fileURLToPath function
import { homePage as data } from "./constants/constant.js";
import templateRoutes from "./routes/templatesRoutes.js";

// Get directory name using fileURLToPath
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

const hbs = exphbs.create({
  defaultLayout: "main",
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "public")));

// Define routes
app.use("/", templateRoutes);

app.get("/", (req, res) => {
  res.render("home", { title: "Home" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Us" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
