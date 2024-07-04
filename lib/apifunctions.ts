import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
const env = await load();

type PhoneInfo = {
  is_valid: boolean;
  country: string;
};

export const getInfoFromPhone = async (phone: string): Promise<PhoneInfo> => {
  const API_KEY = Deno.env.get("API_KEY") || env.API_KEY;
  if (!API_KEY) {
    throw new Error("Not API_KEY founded");
  }

  const url = "https://api.api-ninjas.com/v1/validatephone?number=" + phone;
  const data = await fetch(url, {
    method: "GET",
    headers: { "X-API-KEY": API_KEY },
  });

  if (data.status !== 200) {
    console.error("Error:", data.status, data.statusText);
    throw new Error("Error");
  }

  const response = await data.json();
  return response;
};

type CountryInfo = {
  capital: string;
};

export const getCapitalFromCountry = async (
  country: string,
): Promise<CountryInfo> => {
  const API_KEY = Deno.env.get("API_KEY") || env.API_KEY;
  if (!API_KEY) {
    throw new Error("Not API_KEY founded");
  }

  const url = "https://api.api-ninjas.com/v1/country?name=" + country;
  const data = await fetch(url, {
    method: "GET",
    headers: { "X-API-KEY": API_KEY },
  });

  if (data.status !== 200) {
    console.error("Error:", data.status, data.statusText);
    throw new Error("Error");
  }

  const response = await data.json();
  return response[0];
};

type CapitalInfo = {
  latitude: string;
  longitude: string;
};

export const getCoordFromCapital = async (
  capital: string,
): Promise<CapitalInfo> => {
  const API_KEY = Deno.env.get("API_KEY") || env.API_KEY;
  if (!API_KEY) {
    throw new Error("Not API_KEY founded");
  }

  const url = "https://api.api-ninjas.com/v1/city?name=" + capital;
  const data = await fetch(url, {
    method: "GET",
    headers: { "X-API-KEY": API_KEY },
  });

  if (data.status !== 200) {
    console.error("Error:", data.status, data.statusText);
    throw new Error("Error");
  }

  const response = await data.json();
  return response[0];
};

type CoordInfo = {
  datetime: string;
};

export const getTimeFromCoord = async (
  latitude: string,
  longitude: string,
): Promise<CoordInfo> => {
  const API_KEY = Deno.env.get("API_KEY") || env.API_KEY;
  if (!API_KEY) {
    throw new Error("Not API_KEY founded");
  }

  const url =
    `https://api.api-ninjas.com/v1/worldtime?lat=${latitude}&lon=${longitude}`;
  const data = await fetch(url, {
    method: "GET",
    headers: { "X-API-KEY": API_KEY },
  });

  if (data.status !== 200) {
    console.error("Error:", data.status, data.statusText);
    throw new Error("Error");
  }

  const response = await data.json();
  return response;
};
