'use strict';

const connectionStr = `mongodb+srv://${encodeURIComponent(process.env.DB_USER)}:${encodeURIComponent(process.env.DB_PASSWORD)}@${process.env.DB_HOST}/${process.env.DB_NAME}`;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

module.exports = {
  connectionStr,
  options
}