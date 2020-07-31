import React from 'react';
import { useQuery } from 'react-query';
import { getCountries } from './query';
import { Content, Flag, Link, Text, Title, Wrapper } from './style';
import formatNumber from '../shared/formatNumber';

const CountriesList = () => {
  const { data: countries, error, isLoading } = useQuery('countries', getCountries);

  if (isLoading) return null;
  if (error) return null;

  return (
    <Wrapper>
      {countries.map((country, i) => (
        <Link key={i} to={`/country/${country.name}`}>
          <Flag flag={country.flag} />
          <Content>
            <Title>{country.name}</Title>
            <Text><b>Population: </b>{formatNumber(country.population)}</Text>
            <Text><b>Region: </b>{country.region}</Text>
            <Text><b>Capital: </b>{country.capital}</Text>
          </Content>
        </Link>
      ))}
    </Wrapper>
  );
};

export default CountriesList;
