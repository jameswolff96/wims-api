const Express = require("express");
const app = Express();
const cors = require("cors");
const morgan = require("morgan");
const { Sequelize } = require("sequelize");
const { port } = require("./config");
const PORT = process.env.PORT || port;

const AuthorizationRoutes = require("./auth/routes");
const ProductsRoutes = require("./products/routes");
const UsersRoutes = require("./users/routes");

const ProductModel = require("./common/models/Product");
const UserModel = require("./common/models/User");

app.use(morgan("tiny"));
app.use(cors());

app.use(Express.json());

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./storage/data.db",
});

ProductModel.initialize(sequelize);
UserModel.initialize(sequelize);

sequelize
  .sync()
  .then(() => {
    console.log("Sequelize Initialized");

    app.use("/", AuthorizationRoutes);
    app.get("/status", (req, res) => {
      res.send({ status: "Server is running" });
    });
    app.use("/products", ProductsRoutes);
    app.use("/users", UsersRoutes);

    app.listen(PORT, () => {
      console.log(`Server is listening on PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error while initializing Sequelize", err);
  });
