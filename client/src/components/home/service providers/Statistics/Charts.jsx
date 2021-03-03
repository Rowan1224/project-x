import emoji from "react-easy-emoji";
import { Col, Row } from "react-bootstrap";
import React, { useContext, useState, useEffect } from "react";
import { Chart, Line, Bar, Polar } from "react-chartjs-2";
import "chart.piecelabel.js";
import "chartjs-plugin-datalabels";

import { ThemeContext } from "../../../../contexts/ThemeContext";
import CustomAlert from "../../../generic/CustomAlert";

const Charts = (props) => {
    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const ui = isLightTheme ? theme.light.ui : theme.dark.ui;
    const border = isLightTheme ? theme.light.border : theme.dark.border;
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;
    const pointBorderColor = isLightTheme ? "#205c85" : "#ffae00";
    const ticksBackdropColor = isLightTheme ? "#f8f9fa" : "#343a40";
    const lineChartbg = isLightTheme
        ? theme.light.lineChartbg
        : theme.dark.lineChartbg;
    const mainColor = isLightTheme
        ? theme.light.mainColor
        : theme.dark.mainColor;
    const fontColor = isLightTheme ? "black" : "white";
    const gridColor = isLightTheme
        ? "rgba(0, 0, 0, 0.3)"
        : "rgba(255, 255, 255, 0.3)";

    const [status, setStatus] = useState(undefined);
    const [barChartData, setBarChartData] = useState({});
    const [lineChartData, setLineChartData] = useState({});
    const [polarChartData, setPolarChartData] = useState({});

    // componentDidMount
    useEffect(() => {
        const loadData = async () => {
            // Pie chart
            let API_URL = "/piechart/";
            const bodyData = {
                end_date: props.date.end_date,
                start_date: props.date.start_date,
                service_id: localStorage.getItem("userID"),
            };

            try {
                let response = await fetch(API_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(bodyData),
                });

                let data = await response.json();
                // console.log(data.details);

                if (!response.ok) setStatus(data.message);
                else setPolarChartData(data.details);

                // Line chart
                API_URL = "/linechart/";

                response = await fetch(API_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(bodyData),
                });

                data = await response.json();
                // console.log(data.details);

                if (!response.ok) setStatus(data.message);
                else setLineChartData(data.details);

                // Bar chart
                API_URL = "/horizontalbarchart/";

                response = await fetch(API_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(bodyData),
                });

                data = await response.json();
                // console.log(data.details);

                if (!response.ok) setStatus(data.message);
                else setBarChartData(data.details);
            } catch (error) {
                setStatus(error);
            }
        };

        loadData();
    }, [props.date]);

    Chart.defaults.global.defaultFontColor = fontColor;
    Chart.defaults.global.defaultFontFamily = "Montserrat";

    // Chart.scaleService.defaults.radialLinear.ticks.backdropColor =
    //     "rgba(0, 0, 0, 0)";
    // Chart.defaults.scale.gridLines.color = "#ddd";

    // This line of code took a lot of my time to figure 😑
    Chart.helpers.each(Chart.instances, (instance) => instance.chart.update());

    const chartsData = {
        dataLine: {
            // labels: [
            //     "January",
            //     "February",
            //     "March",
            //     "April",
            //     "May",
            //     "June",
            //     "July",
            // ],
            labels: lineChartData[0],
            // labels: ["3-1-2021", "3-4-2020", "4-16-2021"],
            options: {
                responsive: true,
                legend: {
                    display: false,
                },
                plugins: {
                    datalabels: {
                        display: false,
                    },
                },
                scales: {
                    xAxes: [
                        {
                            // type: "time",
                            // time: {
                            //     unit: "day",
                            //     unitStepSize: 1000,
                            //     displayFormats: {
                            //         millisecond: "MMM DD, YY",
                            //         second: "MMM DD, YY",
                            //         minute: "MMM DD, YY",
                            //         hour: "MMM DD, YY",
                            //         day: "MMM DD, YY",
                            //         week: "MMM DD, YY",
                            //         month: "MMM DD, YY",
                            //         quarter: "MMM DD, YY",
                            //         year: "MMM DD, YY",
                            //     },
                            // },

                            ticks: {
                                source: "labels",
                            },

                            // display: true,
                            scaleLabel: {
                                display: true,
                                labelString: "Date",
                            },
                            gridLines: {
                                color: gridColor,
                            },
                        },
                    ],
                    yAxes: [
                        {
                            // type: "time",
                            // display: true,
                            scaleLabel: {
                                display: true,
                                labelString: "Orders",
                            },
                            gridLines: {
                                color: gridColor,
                            },
                            // ticks: {
                            //     stepSize: 1,
                            // },
                        },
                    ],
                },
            },
            datasets: [
                {
                    // label: "My First dataset",
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: lineChartbg,
                    borderColor: mainColor,
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: pointBorderColor,
                    pointBackgroundColor: "rgb(255, 255, 255)",
                    pointBorderWidth: 8,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgb(0, 0, 0)",
                    pointHoverBorderColor: "rgba(220, 220, 220, 1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    // data: [28, 48, 40, 19, 86, 27, 90],
                    data: lineChartData[1],
                },
            ],
        },
        dataBar: {
            // labels: [
            //     "Red",
            //     "Orange",
            //     "Yellow",
            //     "Green",
            //     "Blue",
            //     "Purple",
            //     "Grey",
            // ],
            labels: barChartData[0],
            options: {
                responsive: true,
                legend: {
                    display: false,
                },
                scales: {
                    xAxes: [
                        {
                            // type: "time",
                            // display: true,
                            scaleLabel: {
                                display: true,
                                labelString: "Employee Name",
                            },
                            gridLines: {
                                color: gridColor,
                            },
                        },
                    ],
                    yAxes: [
                        {
                            // type: "text",
                            // display: true,
                            scaleLabel: {
                                display: true,
                                labelString: "Income",
                            },
                            gridLines: {
                                color: gridColor,
                            },
                        },
                    ],
                },
            },
            datasets: [
                {
                    // label: "My First dataHorizontal",
                    // data: [22, 33, 55, 12, 86, 23, 14],
                    data: barChartData[1],
                    fill: false,
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.4)",
                        "rgba(75, 192, 192, 0.4)",
                        "rgba(54, 162, 235, 0.4)",
                        "rgba(255, 205, 86, 0.4)",
                        "rgba(255, 159, 64, 0.4)",
                        // "rgba(153, 102, 255, 0.6)",
                        // "rgba(201, 203, 207, 0.6)",
                    ],
                    borderColor: [
                        "rgb(255, 99, 132)",
                        "rgb(75, 192, 192)",
                        "rgb(54, 162, 235)",
                        "rgb(255, 205, 86)",
                        "rgb(255, 159, 64)",
                        // "rgb(153, 102, 255)",
                        // "rgb(201, 203, 207)",
                    ],
                    borderWidth: 3,
                },
            ],
        },
        dataPolar: {
            // labels: ["Red", "Green", "Yellow", "Grey", "Dark Grey"],
            labels: polarChartData[0],
            options: {
                responsive: true,
                legend: {
                    position: "right",
                },
                plugins: {
                    datalabels: {
                        display: false,
                    },
                },
                pieceLabel: {
                    showZero: true,
                    render: "percentage",
                    fontColor: fontColor,
                },
                scale: {
                    gridLines: {
                        color: gridColor,
                    },
                    ticks: {
                        backdropColor: ticksBackdropColor,
                    },
                },
            },
            datasets: [
                {
                    // title: "My First dataHorizontal",
                    // data: [300, 50, 100, 40, 120],
                    data: polarChartData[1],
                    borderAlign: "inner",
                    // borderColor: "#777",
                    borderColor: [
                        "rgba(247, 70, 74, 1)",
                        "rgba(70, 191, 189, 1)",
                        "rgba(253, 180, 92, 1)",
                        "rgba(148, 159, 177, 1)",
                        "rgba(77, 83, 96, 1)",
                        "rgba(172, 100, 173, 1)",
                    ],
                    backgroundColor: [
                        "rgba(247, 70, 74, 0.4)",
                        "rgba(70, 191, 189, 0.4)",
                        "rgba(253, 180, 92, 0.4)",
                        "rgba(148, 159, 177, 0.4)",
                        "rgba(77, 83, 96, 0.4)",
                        "rgba(172, 100, 173, 0.4)",
                    ],
                    hoverBackgroundColor: [
                        "#FF5A5E",
                        "#5AD3D1",
                        "#FFC870",
                        "#A8B3C5",
                        "#616774",
                        "#DA92DB",
                    ],
                    borderWidth: 3,
                },
            ],
        },
    };

    return (
        <>
            <Row>
                {status && <CustomAlert status={status} />}

                <Col lg={6} className="mb-4">
                    {props.extraData}
                </Col>

                <Col lg={6} className="mb-4">
                    <div className={"card h-100" + ui + syntax + border}>
                        {Object.keys(lineChartData).length > 0 ? (
                            <div className="card-body">
                                {lineChartData[0] && (
                                    <div className="text-center mb-3">
                                        {emoji("🔥")} Top{" "}
                                        {lineChartData[0].length} most ordered
                                        {Object.keys(lineChartData).length > 1
                                            ? " days "
                                            : " day "}
                                        {emoji("🔥")}
                                    </div>
                                )}
                                <Line
                                    data={chartsData.dataLine}
                                    options={chartsData.dataLine.options}
                                />
                            </div>
                        ) : (
                            <div className="card-body mx-auto d-flex align-items-center">
                                <h5>
                                    Not enough data to show a chart!{" "}
                                    {emoji("🙁")}
                                </h5>
                            </div>
                        )}
                    </div>
                </Col>

                <Col lg={6} className="mb-4">
                    <div className={"card h-100" + ui + syntax + border}>
                        {Object.keys(polarChartData).length > 0 ? (
                            <div className="card-body">
                                {polarChartData[0] && (
                                    <div className="text-center mb-3">
                                        {emoji("🔥")} Top{" "}
                                        {polarChartData[0].length} sold
                                        {Object.keys(lineChartData).length > 1
                                            ? " products "
                                            : " product "}
                                        {emoji("🔥")}
                                    </div>
                                )}
                                {/* <Doughnut
                                    data={chartsData.dataDoughnut}
                                    options={chartsData.dataDoughnut.options}
                                /> */}
                                <Polar
                                    data={chartsData.dataPolar}
                                    options={chartsData.dataPolar.options}
                                />
                            </div>
                        ) : (
                            <div className="card-body mx-auto d-flex align-items-center">
                                <h5>
                                    Not enough data to show a chart!{" "}
                                    {emoji("🙁")}
                                </h5>
                            </div>
                        )}
                    </div>
                </Col>

                <Col lg={6} className="mb-4">
                    <div className={"card h-100" + ui + syntax + border}>
                        {Object.keys(barChartData).length > 0 ? (
                            <div className="card-body">
                                {barChartData[0] && (
                                    <div className="text-center mb-3">
                                        {emoji("🔥")} Top{" "}
                                        {barChartData[0].length}
                                        {Object.keys(lineChartData).length > 1
                                            ? " employees "
                                            : " employee "}{" "}
                                        income {emoji("🔥")}
                                    </div>
                                )}
                                <Bar
                                    data={chartsData.dataBar}
                                    options={chartsData.dataBar.options}
                                />
                            </div>
                        ) : (
                            <div className="card-body mx-auto d-flex align-items-center">
                                <h5>
                                    Not enough data to show a chart!{" "}
                                    {emoji("🙁")}
                                </h5>
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default Charts;
