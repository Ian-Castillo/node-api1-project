// We name the variable express because we are retrieving whatever the express package exports.
// the keyword we will use is "require" 'express' is the name of the package we are requiring
const express = require('express');
// const shortid =require('shortid');
//server object

const server = express(); // we do that by calling the express sever object


server.use(express.json()); //returns a middlewear function, takes raw json string, turns into

let users = [{
  id: "a_unique_id", // hint: use the shortid npm package to generate it
  name: "Jane Doe", // String, required
  bio: "Not Tarzan's Wife, another Jane",  // String, required
}];


server.get ("/", (req, res) => {
  res.json ({ message: "API is a live"});
});

//POST

server.post("/api/users", (req, res) => {
  const userData = req.body;
  const { name, bio } = req.body;

  userData.id = shortId.generate();
//If the request body is missing the name or bio property:
  if (!name || !bio) {
    // respond with HTTP status code 400 (Bad Request). // return the following JSON response: { errorMessage: "Please provide name and bio for the user." }.
    res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    users.push(userData);
    res.status(201).json(userData);
  }
});



// --- GET	Returns an array users.

server.get("/api/users", (req, res) => {
  res.status(201).json(users);
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  const userId = users.find((user) => user.id === id);

  if (userId) {
    res.status(200).json(userId);
  } else {
    res
      .status(400)
      .json({ message: "The user with the specified ID does not exist." });
  }
});

//DELETE

//PATCH


const PORT = 5000;

server.listen(PORT, ()=> {
  console.log (`listening on http://localhost:${PORT}`);
})