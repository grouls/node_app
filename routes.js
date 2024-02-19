const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
        <html>
            <head><title>Homepage</title><head>
            <body>
                <h1>Welcome to my node.js app</h1>
                <form action="/create-user" method="POST">
                    <input type="text" name="username">
                    <button type="Submit">Add User</button>
                </form>
            </body>
        </html>
    `);
    return res.end();
  }
  if (url === "/users") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
        <html>
            <head><title>Add User</title><head>
            <body>
                <ul>
                    <li>User 1</li>
                    <li>User 2</li>
                </ul>
            </body>
        </html>
    `);
    return res.end();
  }

  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile("users.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write(`
      <html>
          <head><title>Something went wrong</title><head>
          <body>
              <h1>Page not found</h1>
          </body>
      </html>
  `);
  return res.end();
};

module.exports = { handler: requestHandler };
