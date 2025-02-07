import express from "express";
import cors from "cors";
import routes from "./routes/route";
import { initDb } from "./initDb";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

initDb()
  .then(() => {
    app.use("/api", routes);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error initializing the database:", error);
  });

export { app };
