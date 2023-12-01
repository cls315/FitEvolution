const server = require("./src/app");
const PORT = 3001;
const { conn } = require("./src/db");

conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log("Server raised");
  });
});
