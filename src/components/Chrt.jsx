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

const data = []
//todo fix to ensure it calls the useGetCurveShape(val) for each interval
for (let i = 0; i < 1000; i++) {
  let numAt = 100 / (1 + Math.exp(-0.02 * (i - 400)))
  data.push({ ether: numAt })
}

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
          <Area
            type="monotone"
            dataKey="ether"
            stroke="#276E00"
            fill="#BFF163"
          />
        </AreaChart>
      </ResponsiveContainer>
    )
  }
}
