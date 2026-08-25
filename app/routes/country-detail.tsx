import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatList, formatNumber, getCountries } from "@/lib/countries";

function DetailSkeleton() {
  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
      <Skeleton className="aspect-[3/2] w-full" />
      <div className="space-y-5">
        <Skeleton className="h-8 w-2/3" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
        </div>
      </div>
    </div>
  );
}

export default function CountryDetail() {
  const { countryCode } = useParams();
  const countriesQuery = useQuery({ queryKey: ["countries"], queryFn: getCountries });
  const country = countriesQuery.data?.find(({ cca3 }) => cca3 === countryCode?.toUpperCase());
  const countryByCode = new Map(countriesQuery.data?.map((item) => [item.cca3, item]));

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link to="/" className="inline-block rounded-lg outline-offset-4 focus-visible:outline-2 focus-visible:outline-zinc-900 dark:focus-visible:outline-white">
        <Button variant="outline" className="h-10 gap-2 bg-white px-5 shadow-sm dark:bg-zinc-900">
          <ArrowLeft aria-hidden="true" /> Back
        </Button>
      </Link>

      <section className="mt-16">
        {countriesQuery.isPending ? <DetailSkeleton /> : null}
        {countriesQuery.isError ? (
          <p role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-700 dark:text-red-300">
            {countriesQuery.error.message}
          </p>
        ) : null}
        {!countriesQuery.isPending && !countriesQuery.isError && !country ? (
          <p role="alert">Country not found.</p>
        ) : null}
        {country ? (
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <img
              src={country.flags.svg || country.flags.png}
              alt={country.flags.alt || `Flag of ${country.name.common}`}
              className="aspect-[3/2] w-full object-cover shadow-sm"
            />
            <div>
              <h1 className="text-3xl font-extrabold">{country.name.common}</h1>
              <div className="mt-8 grid gap-8 text-sm leading-7 sm:grid-cols-2">
                <div>
                  <p><span className="font-semibold">Native Name:</span> {country.name.official}</p>
                  <p><span className="font-semibold">Population:</span> {formatNumber(country.population)}</p>
                  <p><span className="font-semibold">Region:</span> {country.region}</p>
                  <p><span className="font-semibold">Sub Region:</span> {country.subregion || "—"}</p>
                  <p><span className="font-semibold">Capital:</span> {formatList(country.capital)}</p>
                </div>
                <div>
                  <p><span className="font-semibold">Top Level Domain:</span> {formatList(country.tld)}</p>
                  <p><span className="font-semibold">Currencies:</span> {formatList(Object.values(country.currencies ?? {}).map((item) => item.name))}</p>
                  <p><span className="font-semibold">Languages:</span> {formatList(Object.values(country.languages ?? {}))}</p>
                </div>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-2 text-sm">
                <span className="mr-2 font-semibold">Border Countries:</span>
                {country.borders?.length ? country.borders.map((border) => (
                  <Link
                    key={border}
                    to={`/country/${border}`}
                    className="rounded-md bg-white px-3 py-1.5 shadow-sm ring-1 ring-zinc-950/10 transition-colors hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 dark:bg-zinc-900 dark:ring-white/10 dark:hover:bg-zinc-800"
                  >
                    {countryByCode.get(border)?.name.common ?? border}
                  </Link>
                )) : <span>None</span>}
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </main>
  );
}
