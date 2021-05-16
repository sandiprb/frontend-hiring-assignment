import React, { Component } from "react";

class Myshifts extends Component {
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
  render() {
    console.log(this.props.initialData);

    return (
      <>
        <div class="col-md-12 ">
          <br />
          <div class="col-md-12 box" style={{ overflowY: "scroll" }}>
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
                    &emsp; {this.props.initialData[item].length} shifts,
                    {this.props.initialData[item].reduce(
                      (a, b) => a + b.diff,
                      0
                    )}{" "}
                    hr
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
                                <div
                                  class="col-12 d-flex flex-start"
                                  style={{ color: "#4F6C92" }}
                                >
                                  {i.area}
                                </div>
                              </div>
                            </div>
                            <div class="col-md-6 d-flex flex-row-reverse dataStrip">
                              <button
                                class="button"
                                style={{ opacity: i.active == true ? 0.5 : 1 }}
                                disabled={i.active == true ? true : false}
                                onClick={() =>
                                  this.props.canceleventHandler(i._id)
                                }
                              >
                                <b>Cancel </b>
                              </button>
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

export default Myshifts;
