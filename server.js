import express from "express";
import exphbs from "express-handlebars";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url"; // Import fileURLToPath function
import templateRoutes from "./routes/templatesRoutes.js";
// import fs from "fs";
// import Handlebars from "handlebars";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const templateFilePath = path.join(
//   __dirname,
//   "./views/templates/template1/template_1.handlebars"
// );

const hbs = exphbs.create({
  defaultLayout: "main",
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, "public")));

let homePageData;
let leadData;
app.use("/:username", async (req, res, next) => {
  const { username } = req.params;
  try {
    const response = await axios.get(`http://localhost:5000/data/${username}`);

    req.apiData = response.data; // Attach fetched data to req object
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    res.status(500).send("Error fetching data from API");
  }
  // try {
  //   //   // const [homepageResponse, serviceResponse, userResponse, galleryResponse, leadResponse] = await Promise.all([
  //   const [homepageResponse, leadResponse] = await Promise.all([
  //     axios.get(`http://localhost:5000/data/${username}`),
  //     axios.get(
  //       "http://localhost:5000/leadGenerationForm/660697cb8699af9563ab9471"
  //     ),
  //     // // axios.get(`http://localhost:5000/leadGenerationForm/${username}`)
  //     //  // axios.get(`http://localhost:5000/service/${username}`),
  //     //  // axios.get(`http://localhost:5000/user/${username}`),
  //     //  // axios.get(`http://localhost:5000/gallery/${username}`),
  //   ]);

  //   req.apiData = {
  //     homepage: homepageResponse.data,
  //     lead: leadResponse.data,
  //     // service: serviceResponse.data,
  //     // user: userResponse.data,
  //     // gallery: galleryResponse.data,
  //   };
  //   next(); // Proceed to the next middleware/route handler
  // } catch (error) {
  //   // console.error("Error fetching data from API:", error);
  //   res.status(500).send("Error fetching data from API", error);
  // }
});

// app.get("/:username", (req, res) => {
//   const { apiData } = req;
//   const { username } = req.params;

//   if (!apiData) {
//     return res.status(404).send("Data not found for user " + username);
//   }
//   console.log(apiData);
//   // const { homepage } = apiData;
//   const { homepage, lead } = apiData;
//   homePageData = homepage;
//   leadData = lead;

//   const templateDirectory = "templates";
//   let templateFilePath;

//   if (homePageData.templateId === "1") {
//     templateFilePath = "template1/template_1";
//   } else if (homePageData.templateId === "2") {
//     templateFilePath = "template2/template_2";
//   }

//   if (!templateFilePath) {
//     return res.status(404).send("Template not found for user " + username);
//   }

//   const fileName = path.join(templateDirectory, templateFilePath);

//   res.render(fileName, {
//     homePageData: homePageData,
//   });
// });

app.get("/:username", (req, res) => {
  const { username } = req.params;
  const { apiData } = req; // Access the fetched data from req object
  // Render the template with the fetched data
  homePageData = apiData;

  const templateDirectory = "templates";
  let templateFilePath;
  if (homePageData.templateId === "1") {
    templateFilePath = "template1/template_1";
    // console.log(homePageData.templateId);
  } else if (homePageData.templateId === "2") {
    templateFilePath = "template2/template_2";
    // console.log(homePageData.templateId);
  }
  const fileName = path.join(templateDirectory, templateFilePath);

  res.render(fileName, {
    homePageData: homePageData, // Pass only the response data to the template
  });
});

// fetching data of username

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
