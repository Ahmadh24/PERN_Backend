const db = require("../db/dbConfig.js");

// ALL Websites
const getAllWebsites = async () => {
    try {
      const allWebsites = await db.any("SELECT * FROM websites");
      return allWebsites;
    } catch (error) {
      return error;
    }
};

// ONE Website
const getWebsite = async (id) => {
  try {
    const oneWebsite = await db.one("SELECT * FROM websites WHERE id=$1", id);
    return oneWebsite;
  } catch (error) {
    return error;
  }
};

// CREATE
const createWebsite = async (website) => {
  try {
    const newWebsite = await db.one(
      "INSERT INTO websites (name, url, category, is_favorite) VALUES($1, $2, $3, $4) RETURNING *",
      [website.name, website.url, website.category, website.is_favorite]
    );
    return newWebsite;
  } catch (error) {
    return error;
  }
};

// DELETE
const deleteWebsite = async (id) => {
  try {
    const deletedWebsite = await db.one(
      "DELETE FROM websites WHERE id = $1 RETURNING *",
      id
    );
    return deletedWebsite;
  } catch (error) {
    return error;
  }
};

// UPDATE
const updateWebsite = async (id, website) => {
  try {
    const updatedWebsite = await db.one(
      "UPDATE websites SET name=$1, url=$2, category=$3, is_favorite=$4 where id=$5 RETURNING *",
      [website.name, website.url, website.category, website.is_favorite, id]
    );
    return updatedWebsite;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllWebsites,
  getWebsite,
  createWebsite,
  deleteWebsite,
  updateWebsite
};