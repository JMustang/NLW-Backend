import { app } from "./app";
const PORT = 3000;

app.listen(PORT, () =>
  console.log(`Server Running at: http://localhost:${PORT}`)
);
