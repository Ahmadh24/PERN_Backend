const express = require("express");
const websites = express.Router();
const {
  getAllWebsites,
  getWebsite,
  createWebsite,
  deleteWebsite,
  updateWebsite,
} = require("../queries/websites");

const { checkName, checkBoolean, validateURL } = require("../validations/checkWebsites.js");

const reviewsController = require("./reviewsController.js");
websites.use("/:websiteId/reviews", reviewsController);

// INDEX
websites.get("/", async (req, res) => {
    const allWebsites = await getAllWebsites();
    if (allWebsites[0]) {
      res.status(200).json(allWebsites);
    } else {
      res.status(500).json({ error: "server error" });
    }
});

// SHOW
websites.get("/:id", async (req, res) => {
  const {id} = req.params;
  const website = await getWebsite(id);
  if (website) {
    res.json(website);
  } else {
    res.status(404).json({ error: "not found" });
  }
});

// CREATE
websites.post("/", checkName, checkBoolean, validateURL, async (req, res) => {
  try {
    const website = await createWebsite(req.body);
    res.json(website);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

// DELETE
websites.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedWebsite = await deleteWebsite(id);
  if (deletedWebsite.id) {
    res.status(200).json(deletedWebsite);
  } else {
    res.status(404).json("Website not found");
  }
});

// UPDATE
websites.put("/:id", checkName, checkBoolean, validateURL, async (req, res) => {
  const { id } = req.params;
  const updatedWebsite = await updateWebsite(id, req.body);
  res.status(200).json(updatedWebsite);
});

module.exports = websites;