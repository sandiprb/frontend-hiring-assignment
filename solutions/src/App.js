import logo from "./logo.svg";
import "./App.css";
import Myshifts from "./components/myshifts";
import AvailableShifts from "./components/availableShifts";
import React, { Component } from "react";
import axios from "axios";
class App extends Component {
  state = {
    initialShift: "myshifts",
    initialData: [],
    initialData2: [],

    filteredData: [],
    allCities: [],
  };
  canceleventHandler = (id) => {
    console.log("getting the id ", id);
    axios
      .post(`http://127.0.0.1:8080/shifts/${id}/cancel`)
      .then((res) => {
        this.fetchData();
        this.fetchData2();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  bookeventHandler = async (id, city) => {
    console.log("getting the id ", id);
    axios
      .post(`http://127.0.0.1:8080/shifts/${id}/book`)
      .then(async (res) => {
        await this.fetchData(city);
        await this.fetchData2(city);

        console.log("updated result");
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  deepClone = (object) => {
    var newObject = {};
    for (var key in object) {
      if (typeof object[key] === "object" && object[key] !== null) {
        newObject[key] = this.deepClone(object[key]);
      } else {
        newObject[key] = object[key];
      }
    }
    return newObject;
  };
  cityFilterHandler = (val) => {
    let copiedObject = this.deepClone(this.state.initialData);
    Object.keys(copiedObject).map((i) => {
      let obj = copiedObject[i];
      let arr = [];
      Object.keys(obj).map((item) => {
        arr.push(obj[item]);
      });
      copiedObject[i] = arr;
    });

    Object.keys(copiedObject).map((i) => {
      let initialVal = copiedObject[i];
      let nonintial = initialVal.filter((item) => item.area == val);
      copiedObject[i] = nonintial;
    });
    this.setState({ filteredData: copiedObject });
    console.log("cpoied object", copiedObject);
  };
  shiftHandler = (val) => {
    if (val == "main") {
      this.setState({ initialShift: "myshifts" });
    } else {
      this.setState({ initialShift: "availableShifts" });
    }
  };
  fetchData = (city) => {
    axios
      .get("http://127.0.0.1:8080/shifts")
      .then((res) => {
        let sampleResponse = res.data;
        let finalSample = [];
        let allDates = [];
        let cities = [];
        console.log("sampler", sampleResponse);
        sampleResponse.map((item) => {
          allDates.push(new Date(item.startTime).toLocaleDateString("en-US"));
          cities.push(item.area);
        });

        let finalDates = [...new Set(allDates)];
        let allCities = [...new Set(cities)];

        let finalCities = {};
        let finalObj = {};
        for (let i = 0; i < finalDates.length; i++) {
          let counter = 0;
          for (let j = 0; j < sampleResponse.length; j++) {
            if (allCities[i] == sampleResponse[j].area) {
              counter += 1;
            }
            finalCities[allCities[i]] = counter;
          }
        }
        for (let i = 0; i < finalDates.length; i++) {
          let finalArr = [];
          for (let j = 0; j < sampleResponse.length; j++) {
            if (
              finalDates[i] ==
              new Date(sampleResponse[j].startTime).toLocaleDateString("en-US")
            ) {
              let obj = {};
              obj["_id"] = sampleResponse[j].id;
              obj["booked"] = sampleResponse[j].booked;
              obj["area"] = sampleResponse[j].area;
              obj["startTime"] = new Date(sampleResponse[j].startTime)
                .toLocaleTimeString("en-US")
                .split(" ")[0];
              obj["endTime"] = new Date(sampleResponse[j].endTime)
                .toLocaleTimeString("en-US")
                .split(" ")[0];
              let x = new Date(sampleResponse[j].startTime);
              let y = new Date(sampleResponse[j].endTime);
              let res = Math.abs(x - y) / 1000;
              let hours = Math.floor(res / 3600) % 24;
              obj["diff"] = hours;
              let currentTime = new Date();
              let started = (x - currentTime) / 1000;
              let startedHour = Math.floor(started / 3600) % 24;
              obj["active"] = startedHour > 0 ? false : true;

              finalArr.push(obj);
            }
            finalObj[finalDates[i]] = [...finalArr];
          }
        }
        delete finalCities.undefined;
        console.log("finalcities", finalCities);

        this.setState({
          initialData: finalObj,
          allCities: finalCities,
          filteredData: finalObj,
        });
        this.cityFilterHandler(city);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  fetchData2 = (city) => {
    axios
      .get("http://127.0.0.1:8080/shifts")
      .then((res) => {
        let sampleResponse = res.data.filter((i) => i.booked == true);
        let finalSample = [];
        let allDates = [];
        let cities = [];
        console.log("sampler", sampleResponse);
        sampleResponse.map((item) => {
          allDates.push(new Date(item.startTime).toLocaleDateString("en-US"));
          cities.push(item.area);
        });

        let finalDates = [...new Set(allDates)];
        let allCities = [...new Set(cities)];

        let finalCities = {};
        let finalObj = {};
        for (let i = 0; i < finalDates.length; i++) {
          let counter = 0;
          for (let j = 0; j < sampleResponse.length; j++) {
            if (allCities[i] == sampleResponse[j].area) {
              counter += 1;
            }
            finalCities[allCities[i]] = counter;
          }
        }
        for (let i = 0; i < finalDates.length; i++) {
          let finalArr = [];
          for (let j = 0; j < sampleResponse.length; j++) {
            if (
              finalDates[i] ==
              new Date(sampleResponse[j].startTime).toLocaleDateString("en-US")
            ) {
              let obj = {};
              obj["_id"] = sampleResponse[j].id;
              obj["booked"] = sampleResponse[j].booked;
              obj["area"] = sampleResponse[j].area;
              obj["startTime"] = new Date(sampleResponse[j].startTime)
                .toLocaleTimeString("en-US")
                .split(" ")[0];
              obj["endTime"] = new Date(sampleResponse[j].endTime)
                .toLocaleTimeString("en-US")
                .split(" ")[0];
              let x = new Date(sampleResponse[j].startTime);
              let y = new Date(sampleResponse[j].endTime);
              let res = Math.abs(x - y) / 1000;
              let hours = Math.floor(res / 3600) % 24;
              obj["diff"] = hours;
              let currentTime = new Date();
              let started = (x - currentTime) / 1000;
              let startedHour = Math.floor(started / 3600) % 24;
              obj["active"] = startedHour > 0 ? false : true;

              finalArr.push(obj);
            }
            finalObj[finalDates[i]] = [...finalArr];
          }
        }
        delete finalCities.undefined;
        console.log("finalcities", finalCities);

        this.setState({
          initialData2: finalObj,
        });
        this.cityFilterHandler(city);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  componentDidMount = () => {
    this.fetchData();
    this.fetchData2();
  };
  render() {
    return (
      <div className="App">
        <div
          style={{ marginTop: "100px" }}
          class="row  d-flex justify-content-center"
        >
          <div class="col-md-6 row">
            <div class="col-md-3">
              <a
                onClick={() => this.shiftHandler("main")}
                style={{
                  color:
                    this.state.initialShift == "myshifts"
                      ? "#004FB4"
                      : "#CBD2E1",
                  fontSize: "20px",
                  fontWeight: 500,
                }}
              >
                My Shifts
              </a>
            </div>
            <div class="col-md-3">
              <a
                onClick={() => this.shiftHandler("available")}
                style={{
                  color:
                    this.state.initialShift == "myshifts"
                      ? "#CBD2E1"
                      : "#004FB4",
                  fontSize: "20px",
                  fontWeight: 500,
                }}
              >
                Available Shifts{" "}
              </a>
            </div>
          </div>
          {this.state.initialShift == "myshifts" ? (
            <Myshifts
              initialData={this.state.initialData2}
              canceleventHandler={this.canceleventHandler}
            />
          ) : (
            <AvailableShifts
              cities={this.state.allCities}
              initialData={this.state.filteredData}
              bookeventHandler={this.bookeventHandler}
              cityFilterHandler={this.cityFilterHandler}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
