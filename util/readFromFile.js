const fs = require("fs");
const path = require("path");

module.exports = (dir, file, callback) => {
  const p = path.join(path.dirname(require.main.filename), dir, file);

  fs.readFile(p, (err, fileContent) => {
    if (err) {
      callback([]);
    } else {
      callback(JSON.parse(fileContent));
    }
  });
};
