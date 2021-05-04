import React from "react";
import Card from "./Card";

const Cards = ({ total }) => {
  console.log(total);
  const [yesterday, today] = total;
  // const yesterday = total[0];
  // const today = total[1];
  console.log(yesterday);
  console.log(today);
  const data = [
    {
      name: "total",
      title: "Нийт тохиолдол",
      count: today.TotalConfirmed,
      diff: today.TotalConfirmed - yesterday.TotalConfirmed,
    },
    {
      name: "deaths",
      title: "Нийт нас баралт",
      count: today.TotalDeaths,
      diff: today.TotalDeaths - yesterday.TotalDeaths,
    },
    {
      name: "recoveries",
      title: "Нийт идгэрэлт",
      count: today.TotalRecovered,
      diff: today.TotalRecovered - yesterday.TotalRecovered,
    },
    {
      name: "active",
      title: "идэвхтэй тохиолдол",
      count: today.TotalConfirmed - today.TotalRecovered,
      diff:
        today.TotalConfirmed -
        today.TotalRecovered -
        (yesterday.TotalConfirmed - yesterday.TotalRecovered),
    },
  ];

  return (
    <div className="my-16 grid grid-cols-2 gap-7">
      {data.map((el, i) => (
        <Card data={el} key={i} />
      ))}
    </div>
  );
};

export default Cards;
