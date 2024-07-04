import { GraphQLError } from "graphql";
import { ContactModelType } from "../db/contact.ts";
import { getTimeFromCoord } from "../lib/apifunctions.ts";

export const Contact = {
  time: async (parent: ContactModelType): Promise<string> => {
    try {
      const capitalInfo = await getTimeFromCoord(
        parent.latitude,
        parent.longitude,
      );
      return capitalInfo.datetime;
    } catch (err) {
      console.log(err);
      throw new GraphQLError(err);
    }
  },
};
