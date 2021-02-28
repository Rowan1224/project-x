import { Col, Row } from "react-bootstrap";
import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { Chart, Line, HorizontalBar, Pie } from "react-chartjs-2";
import CustomAlert from "../../generic/CustomAlert";

const Charts = (props) => {
    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const ui = isLightTheme ? theme.light.ui : theme.dark.ui;
    const border = isLightTheme ? theme.light.border : theme.dark.border;
    // const pieBorderColor = isLightTheme ? "#808080" : "#f5f5f5";
    // const pieBorderColor = isLightTheme ? "#808080" : "";
    const pointBorderColor = isLightTheme ? "#205c85" : "#ffae00";
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
    const [pieChartData, setPieChartData] = useState({});
    const [barChartData, setBarChartData] = useState({});
    const [lineChartData, setLineChartData] = useState({});

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
                else setPieChartData(data.details);

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
            options: {
                responsive: true,
                scales: {
                    xAxes: [
                        {
                            gridLines: {
                                color: gridColor,
                            },
                        },
                    ],
                    yAxes: [
                        {
                            gridLines: {
                                color: gridColor,
                            },
                        },
                    ],
                },
            },
            datasets: [
                {
                    label: "My First dataset",
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
        dataHorizontal: {
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
                scales: {
                    xAxes: [
                        {
                            gridLines: {
                                color: gridColor,
                            },
                        },
                    ],
                    yAxes: [
                        {
                            gridLines: {
                                color: gridColor,
                            },
                        },
                    ],
                },
            },
            datasets: [
                {
                    label: "My First dataHorizontal",
                    // data: [22, 33, 55, 12, 86, 23, 14],
                    data: barChartData[1],
                    fill: false,
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.5)",
                        "rgba(255, 159, 64, 0.5)",
                        "rgba(255, 205, 86, 0.5)",
                        "rgba(75, 192, 192, 0.5)",
                        "rgba(54, 162, 235, 0.5)",
                        "rgba(153, 102, 255, 0.5)",
                        "rgba(201, 203, 207, 0.5)",
                    ],
                    borderColor: [
                        "rgb(255, 99, 132)",
                        "rgb(255, 159, 64)",
                        "rgb(255, 205, 86)",
                        "rgb(75, 192, 192)",
                        "rgb(54, 162, 235)",
                        "rgb(153, 102, 255)",
                        "rgb(201, 203, 207)",
                    ],
                    borderWidth: 1,
                },
            ],
        },
        dataPie: {
            // labels: ["Red", "Green", "Yellow", "Grey", "Dark Grey"],
            labels: pieChartData[0],
            options: {
                responsive: true,
                legend: {
                    position: "right",
                },
            },
            datasets: [
                {
                    // data: [300, 50, 100, 40, 120],
                    data: pieChartData[1],
                    // borderColor: pieBorderColor,
                    backgroundColor: [
                        "#F7464A",
                        "#46BFBD",
                        "#FDB45C",
                        "#949FB1",
                        "#4D5360",
                        "#AC64AD",
                    ],
                    hoverBackgroundColor: [
                        "#FF5A5E",
                        "#5AD3D1",
                        "#FFC870",
                        "#A8B3C5",
                        "#616774",
                        "#DA92DB",
                    ],
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

                <Col lg={6}>
                    <div className={"card mb-4" + ui + border}>
                        <div className="card-body">
                            <Line
                                data={chartsData.dataLine}
                                options={chartsData.dataLine.options}
                            />
                        </div>
                    </div>
                </Col>

                <Col lg={6}>
                    <div className={"card mb-4" + ui + border}>
                        <div className="card-body">
                            <Pie
                                data={chartsData.dataPie}
                                options={chartsData.dataPie.options}
                            />
                        </div>
                    </div>
                </Col>

                <Col lg={6}>
                    <div className={"card mb-4" + ui + border}>
                        <div className="card-body">
                            <HorizontalBar
                                data={chartsData.dataHorizontal}
                                options={chartsData.dataHorizontal.options}
                            />
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default Charts;
