import React, { useEffect, useState } from "react";
import Cards from "./components/card/Cards";
import Header from "./components/Header";
import Country from "./components/country/Country";
import { Table } from "antd";
import axios from "axios";
import CountryModal from "./components/country/CountryModal";

const colsMn = [
  "Улс",
  "Нэмэгдсэн тохиолдол",
  "Нийт тохиолдол",
  "Нэмэгдсэн нас баралт",
  "Нийт нас баралт",
  "Нэмэгдсэн идгэрэл",
  "Нийт идгэрэл",
];

const cols = [
  "Country",
  "NewConfirmed",
  "TotalConfirmed",
  "NewDeaths",
  "TotalDeaths",
  "NewRecovered",
  "TotalRecovered",
];
// https://viruscovid.tech/
const columns = cols.map((el, i) => {
  let obj = {
    title: colsMn[i],
    dataIndex: el,
    sortDirections: ["descend", "ascend"],
  };
  if (el == "Country") {
    obj.defaultSortOrder = "ascend";
    obj.sorter = (a, b) => a[el] > b[el];
  } else {
    obj.sorter = (a, b) => a[el] - b[el];
  }
  return obj;
});

function App() {
  const [world, setWorld] = useState(null);
  const [allCountries, setAllCountries] = useState(null);
  const [country, setCountry] = useState(null);
  const [data, setData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  function click(e) {
    console.log(e.target.parentElement.firstChild.innerText);
    window.history.pushState(
      null,
      null,
      e.target.parentElement.firstChild.innerText
    );
    showModal();
  }
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    window.history.replaceState(null, null, "/");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    window.history.replaceState(null, null, "/");
  };

  useEffect(() => {
    if (allCountries != null) {
      const res = allCountries.map((el) => {
        return {
          Country: el.Country,
          NewConfirmed: el.NewConfirmed,
          TotalConfirmed: el.TotalConfirmed,
          NewDeaths: el.NewDeaths,
          TotalDeaths: el.TotalDeaths,
          NewRecovered: el.NewRecovered,
          TotalRecovered: el.TotalRecovered,
        };
      });
      setData(res);
    }
  }, [allCountries]);

  useEffect(() => {
    axios.get("http://localhost:3001").then((res) => {
      setWorld(res.data.world);
      // console.log(res.data.allCountries[0]);
      setAllCountries(res.data.allCountries);
      setCountry(res.data.country);
    });
    window.onhashchange = function () {
      console.log("location changed!");
    };
  }, []);

  return (
    <div className="py-12 px-60 select-none">
      <Header />
      {world ? <Cards total={world} /> : "wait"}
      {country ? <Country country={country} /> : "wait"}
      {data ? (
        <Table
          columns={columns}
          dataSource={data}
          onRow={(record, rowIndex) => {
            return {
              onClick: click, // click row
            };
          }}
        />
      ) : (
        "wait"
      )}
      <CountryModal
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </div>
  );
}

export default App;
