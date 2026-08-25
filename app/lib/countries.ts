import countryData from "@/data/countries.json";

export type Country = {
  cca3: string;
  name: { common: string; official: string };
  flags: { svg: string; png: string; alt?: string };
  population: number;
  region: string;
  subregion?: string;
  capital?: string[];
  tld?: string[];
  currencies?: Record<string, { name: string; symbol?: string }>;
  languages?: Record<string, string>;
  borders?: string[];
};

export async function getCountries(): Promise<Country[]> {
  return [...(countryData as unknown as Country[])].sort((a, b) =>
    a.name.common.localeCompare(b.name.common),
  );
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat().format(value);
}

export function formatList(values?: string[]) {
  return values?.join(", ") || "—";
}
