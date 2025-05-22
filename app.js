const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours?.length,
    data: { tours: tours },
  });
};
const getTour = (req, res) => {
  const id = parseInt(req.params.id);

  const tour = tours?.find((el) => {
    return el.id == id;
  });
  if (!tour) {
    return res.status(404).json({ status: "failed", message: "Invalid Id" });
  }
  res.status(200).json({ status: "success", data: { tour: tour } });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1]?.id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({ status: "success", data: { tour: newTour } });
    }
  );
};

const updateTour = (req, res) => {
  const id = req.params.id;
  const tour = tours.find((ele) => ele.id == id);
  if (!tour) {
    return res.status(404).json({ status: "failed", message: "Invalid Id" });
  }
  res
    .status(200)
    .json({ status: "success", data: { tour: "<Updated Tour Here...>" } });
};

const deleteTour = (req, res) => {
  res.status(204).json({ status: "success", data: null });
};

// app.get("/api/v1/tours", getAllTours);
// app.get("/api/v1/tours/:id", getTour);
// app.post("/api/v1/tours", createTour);
// app.patch("/api/v1/tours/:id", updateTour);
// app.delete("/api/v1/tours/:id", deleteTour);

app.route("/api/v1/tours").get(getAllTours).post(createTour);
app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
