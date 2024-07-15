const { default: mongoose } = require("mongoose");

const connectToDB = async () => {
  const connectionURL = process.env.MONGODB_URL;

  mongoose
    .connect(connectionURL)
    .then(() => console.log("work wave database connection is successful"))
    .catch((error) => console.log(error));
};

export default connectToDB;
