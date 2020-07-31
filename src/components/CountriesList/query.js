export const getCountries = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/all?fields=name;flag;population;region;capital`)
    .then(res => res.json());
};
