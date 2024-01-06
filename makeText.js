/** Command-line tool to generate Markov text. */
const fs = require("fs");
const axios = require("axios");
const process = require("process");
const markov = require("./markov");

function generateText(path) {
  fs.readFile(path, "utf8", function manageText(err, data) {
    if (err) {
      console.error(`Cannot read file:${path}:${err}`);
      process.exit(1);
    } else {
      let newMarkovText = new markov.MarkovMachine(data);
      console.log(newMarkovText.makeText());
    }
  });
}

async function generateTextFromURL(url) {
  let res;
  try {
    res = await axios.get(url);
  } catch (err) {
    console.error(`Cannot read URL:${url}:${err}`);
    process.exit(1);
  }
  let newMarkovText = new markov.MarkovMachine(res.data);
  console.log(newMarkovText.makeText());
}

if (process.argv[2] == "file") {
  generateText(process.argv[3]);
} else if (process.argv[2] == "url") {
  generateTextFromURL(process.argv[3]);
}
