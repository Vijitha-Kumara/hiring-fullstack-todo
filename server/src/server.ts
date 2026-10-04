import app from "./config/app";
import dotenv from "dotenv";
dotenv.config({ quiet: true });
const PORT = process.env.PORT;

app.listen(PORT, () => {
 console.log(`TODO App listening at http://localhost:${PORT}`);
});