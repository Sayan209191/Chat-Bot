import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";

const PORT = process.env.PORT || 5000;
connectToDatabase()
    .then((result) => {
        app.listen(PORT, () => console.log("Server Open & Connected to DataBase"));
    }).catch((err) => {
        console.log(err);
    });

