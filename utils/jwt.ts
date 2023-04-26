import jwt from "jsonwebtoken";

export const signToken = (_id: string, email: string) => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error("There is not jwt seed - check .env");
  }

  return jwt.sign(
    {
      _id,
      email,
    },
    process.env.JWT_SECRET_SEED,
    { expiresIn: "30d" }
  );
};

export const isValidToken = (token: string): Promise<string> => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error("There is not jwt seed - check .env");
  }

  if (token.length <= 10) {
    return Promise.reject("Invalid JWT");
  }

  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.JWT_SECRET_SEED || "", (err, payload) => {
        if (err) return reject("Invalid JWT");

        const { _id } = payload as { _id: string };

        resolve(_id);
      });
    } catch (error) {
      return reject("Invalid JWT");
    }
  });
};
