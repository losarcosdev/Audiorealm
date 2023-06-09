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

  await mongoose.connect(process.env.MONGODB_URL || "");
  mongoConnection.isConnected = 1;
  console.log("Connected to MongoDB:", process.env.MONGODB_URL);
};

export const disconnect = async () => {
  if (process.env.NODE_ENV === "production") return;
  // if (process.env.NODE_ENV === "development") return;

  if (mongoConnection.isConnected === 0) return;

  await mongoose.disconnect();
  mongoConnection.isConnected = 0;

  console.log("Disconnected from MongoDB");
};
