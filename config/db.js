const mongoose = require('mongoose');

// THIS WORKED BUT ONLY FOR A LOCAL DATABASE.
// const connectDB = async () => {
//   await mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: true
//   }).then( () => console.log("MongoBongo II: ⚡Electric⚡ Boogaloo... connected!"));
// }

const connectDB = async () => {
  const DB = process.env.MONGO_URI.replace(
    "<PASSWORD>",
    process.env.MONGO_PW
  );

  mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  }).then( () => console.log('MongoBongo II: ⚡Electric⚡ Boogaloo... connected!'));
}



module.exports = connectDB;