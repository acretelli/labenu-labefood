import { restaurants } from "../makeRestaurants";

export default {
  get: jest.fn().mockImplementation((url) => {
    switch (url) {
      case "https://us-central1-missao-newton.cloudfunctions.net/rappi4A/restaurants":
        return Promise.resolve({ data: restaurants });
      default:
        throw new Error(`UNMATCHED URL: ${url}`);
    }
  }),
};