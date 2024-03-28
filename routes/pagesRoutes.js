import express from "express";
import { homePage as data } from "../constants/constant.js";

const router = express.Router();
// router.get("/template1", (req, res) => {
//   res.render("templates/template1/template_1", { title: "template1", data });
// });
// router.get("/template1/about", (req, res) => {
//   res.render("templates/template1/about", { title: "template1-about" });
// });

// router.get("/template2", (req, res) => {
//   res.render("templates/template2/template_2", { title: "template2", data });
// });
// router.get("/template2/about", (req, res) => {
//   res.render("templates/template2/about", { title: "template2-about" });
// });
router.get("/", (req, res) => {
  res.render("home", { title: "Home" });
  // res.render("home", { title: "Home", renderedHtml });
  // res.send(renderedHtml);
});

router.get("/about", (req, res) => {
  res.render("about", { title: "About Us" });
});
export default router;
