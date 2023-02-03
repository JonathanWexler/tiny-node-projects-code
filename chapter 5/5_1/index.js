import express from 'express';
const app = express();
const PORT= `3000`;

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (_req, res) => {
  res.json({ message: "ok" });
});

app.use((e, _req, res) => {
  const {message, stack, statusCode } = e;
  console.error(message, stack);
  res.status(statusCode || 500).json({ message });
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
