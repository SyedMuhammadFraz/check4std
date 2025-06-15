import { webApiInstance } from "../AxiosInstance";

export const useLookupData = async (lookupConfigs) => {
  await Promise.all(
    lookupConfigs.map(async ({ type, setter }) => {
      try {
        const response = await webApiInstance.get("/Lookup/get-by-type", {
          params: { type },
        });
        setter(response.data.result);
      } catch (error) {
        console.error(`Error fetching ${type} lookup:`, error);
        setter([]);
      }
    })
  );
};
