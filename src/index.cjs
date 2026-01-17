const https = require("https");
const printGitHubEvents = require("./print-event.cjs");

function main() {
  const username = process.argv[2];

  if (!username) {
    console.log("Please provide github username to view activity");
    return;
  }

  const GITHUB_ACTIVITY_URL = `https://api.github.com/users/${username}/events`;
  const req = https.get(
    GITHUB_ACTIVITY_URL,
    { headers: { "User-Agent": "node.js" } },
    (res) => {
      let bufferData = "";

      res.on("data", (chunk) => {
        bufferData += chunk;
      });

      res.on("end", () => {
        let parsedData = null;
        try {
          parsedData = JSON.parse(bufferData);
          //   console.log(parsedData);
        } catch (error) {
          console.error("Error parsing json data: ", error.message);
        }
        printGitHubEvents(parsedData);
      });
    },
  );

  req.on("error", (err) =>
    console.error("Error fetching github activity", err.message),
  );
}

// Run main application
main();
