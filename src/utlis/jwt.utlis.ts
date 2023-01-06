import config from "config";
import jwt from "jsonwebtoken";

const privateKey = config.get<string>("privateKey");
const publicKey = config.get<string>("publicKey");
export function signJwt(object: Object, options?: jwt.SignOptions) {
  console.log({ publicKey, privateKey });

  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyJwt(token: string) {
  try {
    console.log({ token, publicKey });
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}