import mongoose from "mongoose";

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */

// Object to store the current state of the connection to MongoDB
const mongoConnection = {
  isConnected: 0,
};

mongoose.set("strictQuery", false);

export const connect = async () => {
  if (mongoConnection.isConnected) {
    console.log("We were already connected");
    return;
  }

  if (mongoose.connections.length > 0) {
    mongoConnection.isConnected = mongoose.connections[0].readyState;

    if (mongoConnection.isConnected === 1) {
      console.log("Using previous connection");
      return;
    }

    await mongoose.disconnect();
  }

  await mongoose.connect(
    "mongodb+srv://lucas09:OTzKd8sbo6IGLH9Y@audiophilecluster.9khkjbb.mongodb.net/audiophileDB" ||
      ""
  );
  mongoConnection.isConnected = 1;
  console.log(
    "Connected to MongoDB:",
    "mongodb+srv://lucas09:OTzKd8sbo6IGLH9Y@audiophilecluster.9khkjbb.mongodb.net/audiophileDB"
  );
};

export const disconnect = async () => {
  if (process.env.NODE_ENV === "production") return;

  if (mongoConnection.isConnected === 0) return;

  await mongoose.disconnect();
  mongoConnection.isConnected = 0;

  console.log("Disconnected from MongoDB");
};
