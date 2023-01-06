import { omit } from "lodash";
import { UserDocument, UserInput } from "./../models/user.model";
import { DocumentDefinition, FilterQuery } from "mongoose";
import UserModel from "../models/user.model";

export async function createUser(input: DocumentDefinition<UserInput>) {
  try {
    const user = await UserModel.create(input);
    return omit(user.toJSON(), "password");
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return false;
  }
  const isValid = await user.comparePassword(password);
  if (!isValid) return false;
  return omit(user.toJSON(), "password");
}

export const findUser = async (query: FilterQuery<UserDocument>) => {
  return UserModel.findOne(query).lean();
};
