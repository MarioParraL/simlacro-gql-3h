import { GraphQLError } from "graphql";
import { ContactModel, ContactModelType } from "../db/contact.ts";
import { getInfoFromPhone } from "../lib/apifunctions.ts";
import {
  getCapitalFromCountry,
  getCoordFromCapital,
  getTimeFromCoord,
} from "../lib/apifunctions.ts";
export const Mutation = {
  addContact: async (
    _: unknown,
    args: { name: string; phone: string },
  ): Promise<ContactModelType> => {
    try {
      const phoneInfo = await getInfoFromPhone(args.phone);
      if (!phoneInfo.is_valid) {
        throw new GraphQLError("Invalid Phone number");
      }

      const capital = await getCapitalFromCountry(phoneInfo.country);
      const coord = await getCoordFromCapital(capital.capital);
      const time = await getTimeFromCoord(
        coord.latitude,
        coord.longitude,
      );

      console.log(coord);
      console.log(time);

      const newContact = new ContactModel({
        name: args.name,
        phone: args.phone,
        country: phoneInfo.country,
        capital: capital.capital,
        longitude: coord.longitude,
        latitude: coord.latitude,
      });

      await newContact.save();
      return newContact;
    } catch (err) {
      console.log(err);
      throw new GraphQLError(err);
    }
  },

  deleteContact: async (_: unknown, args: { id: string }): Promise<Boolean> => {
    try {
      const contact = await ContactModel.deleteOne({ _id: args.id });
      return contact.deletedCount === 1;
    } catch (err) {
      console.log(err);
      throw new GraphQLError(err);
    }
  },
};
