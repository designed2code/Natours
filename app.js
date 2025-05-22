const express = require("express");
const morgan = require("morgan");
const tourRouter = require("./routes/tourRoutes");
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use((req, res, next) => {
  console.log("Hello from the middleware");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const getAllUsers = (req, res) => {
  res
    .status(500)
    .json({ status: "error", message: "This route is not yet defined" });
};

const createUser = (req, res) => {
  res
    .status(500)
    .json({ status: "error", message: "This route is not yet defined" });
};

const getUser = (req, res) => {
  res
    .status(500)
    .json({ status: "error", message: "This route is not yet defined" });
};
const updateUser = (req, res) => {
  res
    .status(500)
    .json({ status: "error", message: "This route is not yet defined" });
};

const deleteUser = (req, res) => {
  res
    .status(500)
    .json({ status: "error", message: "This route is not yet defined" });
};
// app.get("/api/v1/tours", getAllTours);
// app.get("/api/v1/tours/:id", getTour);
// app.post("/api/v1/tours", createTour);
// app.patch("/api/v1/tours/:id", updateTour);
// app.delete("/api/v1/tours/:id", deleteTour);

const userRouter = express.Router();
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

userRouter.route("/").get(getAllUsers).post(createUser);
userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
