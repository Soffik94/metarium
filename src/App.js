import { useEffect, useState } from "react";
import listOfAirports from "./airports";
import listOfCities from "./cities";
import LeftButton from "./components/LeftButton";
import RightButton from "./components/RightButton";

const App = () => {
  const myHeaders = new Headers();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [icaoCode, setIcaoCode] = useState(listOfAirports[0]);
  const [city, setCity] = useState(listOfCities[0]);

  myHeaders.append("X-API-Key", "fef9e3c1552d4e598e5f81fe61");
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  let url = `https://api.checkwx.com/metar/${icaoCode}/decoded`;

  useEffect(() => {
    setLoading(true);
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => result.data)
      .then((data) => {
        console.log(data);
        setData(data[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [icaoCode, url]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <h1>Data nejsou dostupná</h1>;
  }

  const leftButtonHandler = () => {
    setIndex((prevIndex) => {
      const newIndex =
        prevIndex > 0 ? prevIndex - 1 : listOfAirports.length - 1;
      setIcaoCode(listOfAirports[newIndex]);
      setCity(listOfCities[newIndex]);
      return newIndex;
    });
  };

  const rightButtonHandler = () => {
    setIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % listOfAirports.length;
      setIcaoCode(listOfAirports[newIndex]);
      setCity(listOfCities[newIndex]);
      return newIndex;
    });
  };

  const {
    barometer,
    dewpoint,
    humidity,
    visibility,
    temperature,
    wind,
    clouds,
    ceiling,
  } = data;

  return (
    <div>
      <header>
        <h1>METARIUM</h1>
      </header>
      <div className="value-table">
        <section className="airport-name">
          <p>{icaoCode}</p>
          <p>{city}</p>
        </section>
        <section className="one-value">
          <p>Tlak QNH</p>
          <p>{barometer.hpa} hPa</p>
        </section>
        <section className="one-value">
          <p>Teplota vzduchu/Rosný bod</p>
          <p>
            {temperature.celsius}/{dewpoint.celsius} C°
          </p>
        </section>
        <section className="one-value">
          <p>Vlhkost vzduchu</p>
          <p>{humidity.percent} %</p>
        </section>
        <section className="one-value">
          <p>Dohlednost</p>
          <p>{visibility.meters} m</p>
        </section>
        <section className="one-value">
          <p>Rychlost větru</p>
          <p>{wind.speed_kph} km/h</p>
        </section>
        <section className="one-value">
          <p>Zakrytí oblohy oblačností</p>
          <p>{clouds && clouds.length > 0 ? clouds[0].code : "N/A"}</p>
        </section>
        <section className="one-value">
          <p>Výška oblačnosti nad zemí</p>
          <p>{ceiling.meters} m</p>
        </section>
      </div>
      <div className="buttons">
        <div className="one-button">
          <LeftButton left={leftButtonHandler}></LeftButton>
        </div>
        <div className="one-button">
          <RightButton right={rightButtonHandler}></RightButton>
        </div>
      </div>
      <footer>
        <p>&copy;Matěj Šoffr, 2024</p>
      </footer>
    </div>
  );
};

export default App;
