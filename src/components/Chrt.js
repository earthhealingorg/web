import React, { PureComponent } from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const data = [
  { uv: 1, tokens: 1, price: 1 },
  { uv: 20, tokens: 20, price: 20 },
]
// data.forEach(setUpData);
// const datapoints = () => {
//   //todos
//   //query current balance

//   //double the balance to establish a range

//   //make 10 reads of expected token supply and price at levels spread via the range

// }
// const setUpData = (datapoints) => {
// data.push({uv: datapoints})
// };

export default class Chrt extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/simple-area-chart-4ujxw"

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#276E00" fill="#40870D" />
        </AreaChart>
      </ResponsiveContainer>
    )
  }
}
