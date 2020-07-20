// We name the variable express because we are retrieving whatever the express package exports.
// the keyword we will use is "require" 'express' is the name of the package we are requiring
const express = require('express');
const shortid =require('shortid');
//server object

const server = express(); // we do that by calling the express sever object


server.use(express.json()); //returns a middlewear function, takes raw json string, turns into

let users = [{
  id: "a_unique_id", // hint: use the shortid npm package to generate it
  name: "Jane Doe", // String, required
  bio: "Not Tarzan's Wife, another Jane",  // String, required
}];


server.get ("/", (req, res) => {
  res.json ({ message: "API is a working!"});
});

//POST -- /api/users

server.post("/api/users", (req, res) => {
  const userData = req.body; // 

  userData.id = shortid.generate();
  if (!userData.name || !userData.bio) { //If the request body is missing the name or bio property:
    res.status(400).json({ errorMessage: "Please provide name and bio for the user." });    // respond with HTTP status code 400 (Bad Request). // return the following JSON response: { errorMessage: "Please provide name and bio for the user." }.
   // If the information about the user is valid:
  } else {
    users.push(userData); //save the new user the the database.
    res.status(201).json(users); //respond with HTTP status code 201 (Created).
  }
});

// --- GET	/api/users

server.get("/api/users", (req, res) => {
  res.status(201).json(users);
});

// --- GET	/api/users/:id

server.get("/api/users/:id", (req, res) => { 
  const { id } = req.params;

  const user = users.find((user) => user.id === id); 

  if (user) { // if userId exists, code will run
    res.status(200).json(user);
  } else {
    res
      .status(400)
      .json({ message: "The user with the specified ID does not exist." });
  }
});

//--- DELETE /api/users/:id

server.delete('/api/users/:id', (req, res) => {
  const {id} = req.params;
  const deleted = users.find(users => users.id === id);

     if (deleted) {
        users = users.filter(user => user.id != id);
        res.status(200).json({ success: true, deleted });
     } else {
       res.status(404).json({ message: "The user with the specified ID does not exist" });
          }
});

//Update - replace
server.put('/api/users/:id', (req,res) => {
  const {id} = req.params;
  const changes = req.body;

  let found = users.find(user => user.id === id); 
  
  if (found) {
    Object.assign(found, changes);
    res.status(200).json(found);
  } else {
    res.status(404).json({messages: 'users id not found'});
  }
})

const PORT = 5000;

server.listen(PORT, ()=> {
  console.log (`listening on http://localhost:${PORT}`);
})