import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import path from "path";
import { fileURLToPath } from "url";
import expressLayouts from "express-ejs-layouts";

import frontofficeRoutes from "./routes/frontofficeRoutes.js";
import backofficeRoutes from "./routes/backofficeRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const MONGO_URI = "mongodb://127.0.0.1:27017/parfum_app";
const SESSION_SECRET = "parfum-secret-123";


mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connecté"))
  .catch(err => console.error("MongoDB erreur", err));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    name: "parfum-session",
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: MONGO_URI,
      collectionName: "sessions"
    }),
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60
    }
  })
);


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(expressLayouts);
app.set("layout", "layout"); 

app.use(express.static(path.join(__dirname, "public")));


app.use("/api", frontofficeRoutes);

app.use("/api/auth", authRoutes);


app.use("/backoffice", backofficeRoutes);


app.get("/", (req, res) => {
  res.send("Parfum App API & Backoffice opérationnels");
});

app.listen(PORT, () => {
  console.log(`Serveur lancé : http://localhost:${PORT}`);
});
