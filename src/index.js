require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());
const routes = require('./routes');
app.use('/api', routes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
})