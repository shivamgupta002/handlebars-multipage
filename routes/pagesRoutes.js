import express from "express";
import { homePage as data } from "../constants/constant.js";

const router = express.Router();
router.get("/:username", (req, res) => {
  // res.render("../views/home.handlebars", { title: "template1", data });
  res.render("templates/template1/template_1", { title: "template1", data });
});
router.get("/", (req, res) => {
  res.render("home", { title: "Home" });
  // res.render("home", { title: "Home", renderedHtml });
  // res.send(renderedHtml);
});

router.get("/about", (req, res) => {
  res.render("about", { title: "About Us" });
});
export default router;
