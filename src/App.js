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
    setLoading(true); // Nastaví loading na true při každé změně icaoCode
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => result.data)
      .then((data) => {
        setData(data[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [icaoCode]);

  if (loading) {
    return <h1>Načítám</h1>;
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

  const { barometer, dewpoint, humidity, visibility, temperature } = data;

  return (
    <div className="app">
      <h1 className="app-title">METARIUM</h1>
      <h2 className="city">{city}</h2>
      <p>{icaoCode}</p>

      <div className="value-table">
        <section className="one-value">
          <p>Tlak QNH</p>
          <div>{barometer.hpa} hPa</div>
        </section>
        <section className="one-value">
          <p>Teplota vzduchu/Rosný bod</p>
          <div>
            {temperature.celsius}/{dewpoint.celsius} C°
          </div>
        </section>
        <section className="one-value">
          <p>Vlhkost vzduchu</p>
          <div>{humidity.percent} %</div>
        </section>
        <section className="one-value">
          <p>Dohlednost</p>
          <div>{visibility.meters} m</div>
        </section>
      </div>

      <div className="buttons">
        <LeftButton left={leftButtonHandler} className="button" />
        <RightButton right={rightButtonHandler} className="button" />
      </div>
    </div>
  );
};

export default App;
