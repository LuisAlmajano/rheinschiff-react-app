// Ref: https://recharts.org/en-US/api

import "./Chart.css";

import PropTypes from "prop-types";
import Spinner from "../../UIElements/Spinner";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Line,
} from "recharts";

// const data = [
//   {
//     month: "Jan",
//     2021: 0,
//     2022: 18,
//   },
//   {
//     month: "Feb",
//     2021: 0,
//     2022: 24,
//   },
//   {
//     month: "Mar",
//     2021: 3,
//     2022: 13,
//   },
//   {
//     month: "Apr",
//     2021: 28,
//     2022: 40,
//   },
//   {
//     month: "May",
//     2021: 25,
//     2022: 16,
//   },
//   {
//     month: "Jun",
//     2021: 16,
//     2022: 20,
//   },
//   {
//     month: "Jul",
//     2021: 17,
//     2022: 19,
//   },
//   {
//     month: "Aug",
//     2021: 0,
//     2022: 0,
//   },
//   {
//     month: "Sept",
//     2021: 0,
//     2022: 0,
//   },
//   {
//     month: "Oct",
//     2021: 30,
//     2022: 0,
//   },
//   {
//     month: "Nov",
//     2021: 23,
//     2022: 0,
//   },
//   {
//     month: "Dec",
//     2021: 0,
//     2022: 0,
//   },
// ];

const Chart = ({ loading, counter2021, counter2022 }) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  let inputData = [];

  if (loading) {
    return <Spinner />;
  } else {
    for (let i = 0; i < 12; i++) {
      inputData[i] = {
        month: months[i],
        2021: counter2021[i],
        2022: counter2022[i],
      };
    }

    return (
      <div className="chart">
        <div className="title">Number of Boats sighted per Month</div>
        <ResponsiveContainer width="100%" aspect={2 / 1}>
          <AreaChart
            width={730}
            height={250}
            data={inputData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="2021" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="2022" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="2022"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#2022)"
            />
            <Area
              type="monotone"
              dataKey="2021"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#2021)"
            />

            <Legend verticalAlign="top" height={36} />
            <Line name="2021" type="monotone" dataKey="2021" stroke="#8884d8" />
            <Line name="2022" type="monotone" dataKey="2022" stroke="#82ca9d" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
};

Chart.propTypes = {
  loading: PropTypes.bool.isRequired,
  counter2021: PropTypes.array.isRequired,
  counter2022: PropTypes.array.isRequired,
};

export default Chart;
