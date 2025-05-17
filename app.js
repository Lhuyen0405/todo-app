require('dotenv').config();
const express = require('express');
const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes'); 

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/auths', authRoutes);
app.use('/api/todos', todoRoutes); 

const PORT = process.env.PORT || 3001;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Unable to connect to MySQL:', error);
  process.exit(1);
});



// xxx/api/users/get

// xxx/api/users/get

