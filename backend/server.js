const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const passport = require("passport");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const { LocalStrategy } = require("./config/strategies");
const session = require("express-session");
const mongoSanitize = require("express-mongo-sanitize");
const bodyParser = require("body-parser");
const { connectDB } = require("./config/db");
const User = require("./models/userModel");
const userRoutes = require("./routes/userRoutes");
const brandRoutes = require("./routes/brandRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");

const adminRoutes = require("./routes/adminRoutes");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const { sessionOption } = require("./config/sessionOption");

dotenv.config();

connectDB();

const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const __dirnames = path.resolve();
app.use("/uploads", express.static(path.join(__dirnames, "/uploads")));

app.use(express.json());
//Use Patch and Put with override
app.use(methodOverride("_method"));
//USe cookiePArser
app.use(cookieParser());
//USe Session
app.use(session(sessionOption));
//Use ROute for Scripts
//use Mongo Sanitize
app.use(mongoSanitize());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//USe passport
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
// Local Login
passport.use(LocalStrategy);

app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.get("/api/brands", brandRoutes);
app.get("/api/categories", categoryRoutes);
app.get("/api/products", productRoutes); 

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirnames, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirnames, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
