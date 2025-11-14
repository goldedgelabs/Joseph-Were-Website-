const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGODB_URI;

let cached = global.__mongo;

if (!cached) {
  cached = global.__mongo = { conn: null, promise: null };
}

async function connect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    const opts = {};
    cached.promise = mongoose.connect(MONGO_URI, opts).then(m => {
      return m;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = connect;
