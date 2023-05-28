const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { log } = require("console");
const geoCode = require("./Utils/geoCode");
const forecast = require("./Utils/forecast");
const app = express();

// define path for express
const staticDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "/templates/views");
const partialPath = path.join(__dirname, "/templates/partials");

// setup handlebar and view location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

//setup static directory to serve
app.use(express.static(staticDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Home",
    name: "Laksh",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Laksh",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "This is some help text",
    name: "Laksh",
  });
});
// app.get("/help", (req, res) => {
//   res.send({
//     name: "laksh",
//     age: "25",
//   });
// });

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "No address provided!",
    });
  }
  geoCode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }
    forecast(latitude, longitude, (error, forecast) => {
      if (error) {
        return res.send({
          error,
        });
      }
      res.send({
        forecast: forecast,
        location,
        address: address,
      });
    });
  });
  // res.send({
  //   forecaste: "cloudy",
  //   location: "Philadelphia",
  //   address: address,
  // });
});

app.get("/products", (req, res) => {
  console.log(req.query);
  if (!req.query.search) {
    return res.send({
      error: "search query not send",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Help article not found!",
    name: "Laksh",
  });
});

app.get("/*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "My 404 Page",
    name: "Laksh",
  });
});

app.listen(3000, () => {
  console.log("server is running at port 3000!");
});
