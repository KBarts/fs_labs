import cors from 'cors';
import express from 'express';

import departmentRoutes from './routes/departmentRoutes';
import roleRoutes from './routes/roleRoutes';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use(departmentRoutes);
app.use(roleRoutes);

app.get('/', (_req, res) => {
  res.send('Pixell River API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});