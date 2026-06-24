import { buildApp } from './app.js';

const PORT = Number(process.env.PORT ?? 3000);
const app = buildApp();

app.listen(PORT, () => {
  console.log(`NorthStarCheck listening on http://localhost:${PORT}`);
});
