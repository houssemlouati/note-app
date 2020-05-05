const fs = require("fs");

if (process.argv[2].toString() === "list") {
  fs.readFile("./list.json", "utf8", function (erreur, data) {
    if (erreur) throw erreur;
    var monJson = JSON.parse(data);
    console.log(monJson);
  });
} else if (
  process.argv[2].toString() === "add" &&
  (process.argv[3] === "-t" || process.argv[3] === "--title") &&
  (process.argv[5] === "-b" || process.argv[5] === "-body") &&
  process.argv.length === 7
) {
  const newtitle = process.argv[4],
    newbody = process.argv[6];
  var newnote = [
    {
      title: newtitle,
      body: newbody,
    },
  ];
  fs.readFile("./list.json", "utf8", function (erreur, data) {
    if (erreur) throw erreur;
    var monJson = JSON.parse(data).concat(newnote);

    fs.writeFile("./list.json", JSON.stringify(monJson), function (err) {
      if (err) return console.log(err);
    });
  });
} else if (
  process.argv[2].toString() === "remove" &&
  (process.argv[3] === "-t" || process.argv[3] === "--title") &&
  process.argv.length === 5
) {
  const rmvtitle = process.argv[4];
  fs.readFile("./list.json", "utf8", function (erreur, data) {
    if (erreur) throw erreur;
    var monJson = JSON.parse(data);
    var newlist = monJson.filter((el) => el.title !== rmvtitle);
    fs.writeFile("./list.json", JSON.stringify(newlist), function (err) {
      if (err) return console.log(err);
    });
  });
} else if (
  process.argv[2].toString() === "read" &&
  (process.argv[3] === "-t" || process.argv[3] === "--title") &&
  process.argv.length === 5
) {
  const readtitle = process.argv[4];
  fs.readFile("./list.json", "utf8", function (erreur, data) {
    if (erreur) throw erreur;
    var monJson = JSON.parse(data);
    var newlist = monJson.filter((el) => el.title === readtitle);
    console.log(newlist);
  });
} else {
  console.log(
    "\n\n---------FOR ADDING NEW LIST PLEASE USE THIS COMMAND :\n" +
      "node note-app.js add -t newtitle -b newbody\n" +
      "or\n" +
      "node note-app.js add --title newtitle --body newbody\n\n\n" +
      "---------FOR LISTING ALL NOTE PLEASE USE THIS COMMAND\n" +
      "node note-app.js list\n\n\n" +
      "---------FOR REMOVING A NOTE PLEASE USE THIS COMMAND\n" +
      "node note-app.js remove --title title\n" +
      "or\n" +
      "node note-app.js remove -t title\n\n\n" +
      "---------FOR READING A SPECIFIC NOTE PLEASE USE THIS COMMAND\n" +
      "node note-app.js read --title title\n" +
      "or\n" +
      "node note-app.js read -t title\n\n\n"
  );
}
