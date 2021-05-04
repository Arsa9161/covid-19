const axios = require("axios");

const getWorld = async () => {
  const [yesterday, today] = getDates();
  const world = await axios
    .get(
      `https://api.covid19api.com/world?from=${yesterday}T00:00:00Z&to=${today}T00:00:00Z`
    )
    .then((result) => result.data);

  return world;
};

const getCountry = async (name) => {
  const [yesterday, today] = getDates();
  const country = await axios
    .get(
      `https://api.covid19api.com/total/country/${name}?from=${yesterday}T00:00:00Z&to=${today}T00:00:00Z`
    )
    .then((result) => result.data[0]);

  return country;
};

const getAllCountries = async () => {
  const all = await axios
    .get("https://api.covid19api.com/summary")
    .then((result) => result.data.Countries);

  return all;
};

const getDates = (step) => {
  let todayDate = new Date();
  const today = todayDate.toISOString().split("T")[0];
  const yesterdayDate = new Date(todayDate);

  if (step == "month") yesterdayDate.setDate(todayDate.getDate() - 30);
  else yesterdayDate.setDate(todayDate.getDate() - 2);

  const yesterday = yesterdayDate.toISOString().split("T")[0];

  return [yesterday, today];
};

const convert = (date) => {
  return date.split("-")[1] + "/" + date.split("-")[2].substr(0, 2);
};

const generate = (arr) => {
  return arr.map((el) => {
    return { cases: el.Cases, date: convert(el.Date) };
  });
};

exports.countryTotal = async (req, res, next) => {
  const { country } = req.body;
  const result = await getCountry(country);
  res.status(200).send(result);
};

exports.country = async (req, res, next) => {
  const { country } = req.body;
  const [beforeMonth, today] = getDates("month");

  const confirmed = await axios
    .get(
      `https://api.covid19api.com/country/${country}/status/confirmed?from=${beforeMonth}T00:00:00Z&to=${today}T00:00:00Z`
    )
    .then((res) => res.data);

  const recovered = await axios
    .get(
      `https://api.covid19api.com/country/${country}/status/recovered?from=${beforeMonth}T00:00:00Z&to=${today}T00:00:00Z`
    )
    .then((res) => res.data);

  const deaths = await axios
    .get(
      `https://api.covid19api.com/country/${country}/status/deaths?from=${beforeMonth}T00:00:00Z&to=${today}T00:00:00Z`
    )
    .then((res) => res.data);

  res.status(200).send({
    confirmed: generate(confirmed),
    recovered: generate(recovered),
    deaths: generate(deaths),
  });
};

exports.main = async (req, res, next) => {
  const world = await getWorld();
  const allCountries = await getAllCountries();
  const country = await getCountry("mongolia");
  res.status(200).send({ world, allCountries, country });
};
