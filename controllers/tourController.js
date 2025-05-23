const fs = require("fs");
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: tours?.length,
    data: { tours: tours },
  });
};
exports.getTour = (req, res) => {
  const id = parseInt(req.params.id);

  const tour = tours?.find((el) => {
    return el.id == id;
  });
  if (!tour) {
    return res.status(404).json({ status: "failed", message: "Invalid Id" });
  }
  res.status(200).json({ status: "success", data: { tour: tour } });
};

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
  const id = req.params.id;
  const tour = tours.find((ele) => ele.id == id);
  if (!tour) {
    return res.status(404).json({ status: "failed", message: "Invalid Id" });
  }
  res
    .status(200)
    .json({ status: "success", data: { tour: "<Updated Tour Here...>" } });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({ status: "success", data: null });
};
