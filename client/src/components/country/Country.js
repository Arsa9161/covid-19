import React from "react";
import { Statistic, Row, Col, Progress, Image } from "antd";
import Chart from "../ChartStatistic";

function Country({ country }) {
  const data = [
    {
      title: "Нийт тохиолдол",
      count: country.Confirmed,
    },
    {
      title: "Нийт нас баралт",
      count: country.Deaths,
    },
    {
      title: "Нийт идгэрэлт",
      count: country.Recovered,
    },
    {
      title: "идэвхтэй тохиолдол",
      count: country.Confirmed - country.Recovered,
    },
  ];
  const recPercent = ((country.Recovered * 100) / country.Confirmed).toFixed(1);
  const deathPercent = ((country.Deaths * 100) / country.Confirmed).toFixed(1);

  return (
    <div className="py-8 rounded-xl shadow w-4/5 mb-20 mx-auto">
      <header className="flex justify-center align-items-center mb-5">
        <h1 className="text-4xl bold mr-8">Монгол</h1>
        <Image
          className="rounded-lg mt-2"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Flag_of_Mongolia.svg/60px-Flag_of_Mongolia.svg.png"
        />
      </header>
      <Row gutter={16}>
        {data.map((el, i) => (
          <Col span={12} className="mb-8" key={i}>
            <Statistic
              className="mx-auto text-center"
              title={el.title}
              value={el.count}
            />
          </Col>
        ))}
      </Row>
      <footer className="w-4/5 mx-auto">
        <p>Эдгэрэлтийн хувь %</p>
        <Progress percent={recPercent} />
        <p>Нас баралтын хувь %</p>
        <Progress percent={deathPercent} />
        <Chart country="mongolia" className="mt-8" />
      </footer>
    </div>
  );
}

export default Country;
