const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://tiggasantkumar:7PHCr2mLzoFDGbVl@cluster0.sleulsa.mongodb.net/gofood?retryWrites=true&w=majority&appName=Cluster0";
module.exports = function (callback) {
  mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
    if (err) console.log("---" + err);
    else {
      console.log("connected to mongo");
      const foodCollection = await mongoose.connection.db.collection(
        "data_items"
      );
      foodCollection.find({}).toArray(async function (err, data) {
        const categoryCollection = await mongoose.connection.db.collection(
          "foodCategory"
        );
        categoryCollection.find({}).toArray(async function (err, Catdata) {
          callback(err, data, Catdata);
        });
      });
    }
  });
};
