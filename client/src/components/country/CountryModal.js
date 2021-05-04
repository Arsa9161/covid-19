import React, { useState, useEffect } from "react";
import { Modal, Statistic, Row, Col, Progress, Spin } from "antd";
import axios from "axios";

function CountryModal({ isModalVisible, handleOk, handleCancel }) {
  const [data, setData] = useState(null);

  const country = window.location.pathname.split("/")[1];
  //   console.log(country);
  useEffect(() => {
    if (isModalVisible) {
      console.log("chanfed**************************");
      axios
        .post("http://localhost:3001/countryTotal", { country })
        .then((res) => {
          const stats = res.data;
          console.log("data**************************");
          console.log(stats);
          setData([
            {
              title: "Нийт тохиолдол",
              count: stats.Confirmed,
            },
            {
              title: "Нийт нас баралт",
              count: stats.Deaths,
            },
            {
              title: "Нийт идгэрэлт",
              count: stats.Recovered,
            },
            {
              title: "идэвхтэй тохиолдол",
              count: stats.Confirmed - stats.Recovered,
            },
          ]);
        });
    }
  }, [isModalVisible]);

  return (
    <>
      <Modal
        title="Статистик"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {data ? (
          <div className="py-8">
            <header className="flex justify-center align-items-center mb-5">
              <h1 className="text-4xl bold mr-8">{country}</h1>
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
              <Progress
                percent={((data[2].count * 100) / data[0].count).toFixed(1)}
              />
              <p>Нас баралтын хувь %</p>
              <Progress
                percent={((data[1].count * 100) / data[0].count).toFixed(1)}
              />
            </footer>
          </div>
        ) : (
          <Spin size="large" className="mx-auto my-5" />
        )}
      </Modal>
    </>
  );
}

export default CountryModal;
