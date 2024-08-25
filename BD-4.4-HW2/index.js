let express = require("express");
let app = express();
let port = process.env.port || 3000;
let db;
let sqlite3 = require("sqlite3");
let { open } = require("sqlite");
// Connect to the database
(async () => {
  db = await open({
    filename: "./BD-4.4-HW2/database.sqlite",
    driver: sqlite3.Database,
  });
  if (db) console.log("Connected to the SQLite database.");
})();
// Message
app.get("/", (req, res) => {
  res.status(200).json({ message: "BD 4.4 HW2 Select specific columns" });
});
//node BD-4.4-HW1/initDB.js
// THE ENPOINTS
//node BD-4.4-HW1
//1 /artworks
async function fetchAllArtworks() {
  let response = await db.all("SELECT id, title, artist FROM artworks");
  return { artworks: response };
}
app.get("/artworks", async (req, res) => {
  try {
    const result = await fetchAllArtworks();
    if (result.artworks.length === 0)
      return res.status(404).json({ message: "No artworks found" });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
//2 /artworks/artist/Vincent%20Van%20Gogh
async function fetchArtworksByArtist(artist) {
  let response = await db.all(
    "SELECT id, title, artist, year FROM artworks WHERE artist = ?",
    [artist],
  );
  return { artworks: response };
}
app.get("/artworks/artist/:artist", async (req, res) => {
  let artist = req.params.artist;
  try {
    const result = await fetchArtworksByArtist(artist);
    if (result.artworks.length === 0)
      return res.status(404).json({ message: "No artworks found" });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
//3 /artworks/year/1889
async function fetchArtworksByYear(year) {
  let response = await db.all(
    "SELECT id, title, artist, year FROM artworks WHERE year = ?",
    [year],
  );
  return { artworks: response };
}
app.get("/artworks/year/:year", async (req, res) => {
  let year = req.params.year;
  try {
    const result = await fetchArtworksByYear(year);
    if (result.artworks.length === 0)
      return res.status(404).json({ message: "No artworks found" });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
//4 /artworks/medium/Oil%20Painting
async function fetchArtworksByMedium(medium) {
  let response = await db.all(
    "SELECT id, title, artist, medium FROM artworks WHERE medium = ?",
    [medium],
  );
  return { artworks: response };
}
app.get("/artworks/medium/:medium", async (req, res) => {
  let medium = req.params.medium;
  try {
    const result = await fetchArtworksByMedium(medium);
    if (result.artworks.length === 0)
      return res.status(404).json({ message: "No artworks found" });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
