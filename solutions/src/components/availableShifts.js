import React, { Component } from "react";

class AvailableShifts extends Component {
  state = {
    city: "Helsinki",
  };
  componentDidMount = () => {
    this.props && this.props.cityFilterHandler(this.state.city);
  };
  getMonth = (i) => {
    console.log("i", i);
    switch (i) {
      case "1":
        return "January";
      case "2":
        return "February";
      case "3":
        return "March";
      case "4":
        return "April";
      case "5":
        return "May";
      case "6":
        return "June";
      case "7":
        return "July";
      case "8":
        return "August";
      case "9":
        return "September";
      case "10":
        return "October";
      case "11":
        return "November";
      case "12":
        return "December";
    }
  };
  cityFilter = (city) => {
    this.setState({ city: city });
    this.props.cityFilterHandler(city);
  };
  render() {
    return (
      <>
        <div class="col-md-12 ">
          <br />
          <div class="col-md-12 box" style={{ overflowY: "scroll" }}>
            <div class="row d-flex justify-content-around availableShiftsHeader">
              {Object.keys(this.props.cities).map((item) => {
                return (
                  <div
                    onClick={() => this.cityFilter(item)}
                    style={{
                      color: this.state.city == item ? "#004FB4" : "#CBD2E1",
                    }}
                  >
                    <b>
                      {item}({this.props.cities[item]})
                    </b>
                  </div>
                );
              })}
            </div>
            {Object.keys(this.props.initialData).map((item) => {
              return (
                <div class="row">
                  <div
                    class="col-md-12 d-flex flex-start headerStrip"
                    style={{ color: "#4F6C92" }}
                  >
                    <b>
                      {item == new Date().toLocaleDateString("en-US")
                        ? "Today"
                        : item ==
                          new Date(+new Date() + 86400000).toLocaleDateString(
                            "en-US"
                          )
                        ? "Tomorrow"
                        : this.getMonth(item.split("/")[0]) +
                          item.split("/")[1]}
                    </b>{" "}
                  </div>
                  {this.props && this.props.initialData
                    ? this.props.initialData[item].map((i) => {
                        return (
                          <div class="col-md-12 d-flex flex-row">
                            <div class="col-md-6 d-flex  dataStrip ">
                              <div class="row">
                                <div
                                  class="col-12 d-flex flex-start"
                                  style={{ color: "#4F6C92" }}
                                >
                                  {i.startTime} - {i.endTime}{" "}
                                </div>
                              </div>
                            </div>
                            <div class="col-md-6 d-flex flex-row-reverse dataStrip">
                              {i.booked == true ? (
                                <div>
                                  Booked&emsp;
                                  <button
                                    class="button"
                                    style={{
                                      opacity: i.active == true ? 0.5 : 1,
                                    }}
                                    disabled={i.active == true ? true : false}
                                    onClick={() =>
                                      this.props.canceleventHandler(i._id)
                                    }
                                  >
                                    <b>Cancel </b>
                                  </button>
                                </div>
                              ) : (
                                <button
                                  class="buttonactive"
                                  style={{
                                    opacity: i.active == true ? 0.5 : 1,
                                  }}
                                  disabled={i.active == true ? true : false}
                                  onClick={() =>
                                    this.props.bookeventHandler(
                                      i._id,
                                      this.state.city
                                    )
                                  }
                                >
                                  <b>Book </b>
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })
                    : "Data N.A"}
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default AvailableShifts;
