import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber, getCountries } from "@/lib/countries";

const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

function CountryGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }, (_, index) => (
        <Card key={index} className="gap-0 py-0">
          <Skeleton className="aspect-[3/2] w-full rounded-b-none" />
          <CardContent className="space-y-3 py-6">
            <Skeleton className="h-5 w-3/5" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/5" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState<string | null>(null);
  const countriesQuery = useQuery({ queryKey: ["countries"], queryFn: getCountries });

  const countries = useMemo(() => {
    const term = search.trim().toLocaleLowerCase();
    return (countriesQuery.data ?? []).filter((country) => {
      const matchesSearch = !term || country.name.common.toLocaleLowerCase().includes(term);
      const matchesRegion = !region || country.region === region;
      return matchesSearch && matchesRegion;
    });
  }, [countriesQuery.data, region, search]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-zinc-500" aria-hidden="true" />
          <Input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search for a country…"
            aria-label="Search for a country"
            className="h-12 bg-white pl-12 shadow-sm dark:bg-zinc-900"
          />
        </div>
        <Select value={region} onValueChange={setRegion}>
          <SelectTrigger className="h-12 w-full bg-white shadow-sm sm:w-52 dark:bg-zinc-900">
            <SelectValue placeholder="Filter by Region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={null}>All regions</SelectItem>
            {regions.map((item) => (
              <SelectItem key={item} value={item}>{item}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {countriesQuery.isPending ? <CountryGridSkeleton /> : null}
      {countriesQuery.isError ? (
        <p role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-700 dark:text-red-300">
          {countriesQuery.error.message}
        </p>
      ) : null}
      {!countriesQuery.isPending && !countriesQuery.isError ? (
        <>
          {countries.length === 0 ? <p className="text-zinc-500">No countries match your filters.</p> : null}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {countries.map((country) => (
              <Link
                key={country.cca3}
                to={`/country/${country.cca3}`}
                className="block rounded-xl outline-offset-4 focus-visible:outline-2 focus-visible:outline-zinc-900 dark:focus-visible:outline-white"
              >
                <Card className="h-full gap-0 py-0 transition-transform hover:-translate-y-1 hover:shadow-lg">
                  <img
                    src={country.flags.svg || country.flags.png}
                    alt={country.flags.alt || `Flag of ${country.name.common}`}
                    className="aspect-[3/2] w-full object-cover"
                  />
                  <CardHeader className="px-6 pt-6">
                    <CardTitle className="font-extrabold">{country.name.common}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1 px-6 pb-8 text-sm">
                    <p><span className="font-semibold">Population:</span> {formatNumber(country.population)}</p>
                    <p><span className="font-semibold">Region:</span> {country.region}</p>
                    <p><span className="font-semibold">Capital:</span> {country.capital?.[0] ?? "—"}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </>
      ) : null}
    </main>
  );
}
