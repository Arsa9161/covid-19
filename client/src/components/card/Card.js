import React from "react";
import active from "../../assets/images/active_cases.svg";
import total from "../../assets/images/cases.svg";
import deaths from "../../assets/images/deaths.svg";
import recoveries from "../../assets/images/recoveries.svg";

const svgs = {
  active,
  total,
  deaths,
  recoveries,
};

const formatNumber = (number) => {
  let arr = String(number).split("").reverse();
  let res = "";
  arr.forEach((el, i) => {
    res += el;
    if (i % 3 === 2 && i !== 0 && arr.length - 1 !== i) res += ",";
  });

  return res.split("").reverse().join("");
};

const Card = ({ data }) => {
  return (
    <div className="p-5 rounded-xl shadow">
      <div className="flex justify-between mb-4">
        <div className="column">
          <p className="opacity-60">{data.title}</p>
          <h1 className="text-4xl font-bold">{formatNumber(data.count)}</h1>
        </div>
        <img src={svgs[data.name]} alt="" />
      </div>
      <span
        className={`py-0.5 px-2 ${
          data.diff > 0 ? "bg-green-500" : "bg-red-500"
        } rounded-md`}
      >
        {formatNumber(data.diff)}
      </span>
    </div>
  );
};

export default Card;
