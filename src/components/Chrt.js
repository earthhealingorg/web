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
// const tvl =(useVaultTotalAssets(BigNumber(0)))
// const midpoint = useGetCurveShape(tvl);
// const makeData = () => {

//   const upperbound = midpoint * 2;
//   for (let i = 0; i < 10; i++){
//     let multiplier = i * upperbound
//     data.push({ether: multiplier, tokens: "", price: ""})
//   }
// }
// makeData()
// // data.forEach(setUpData);
// // const datapoints = () => {
// //todos
// //query current balance

// //double the balance to establish a range

// //make 10 reads of expected token supply and price at levels spread via the range

// // }
// // const setUpData = (datapoints) => {
// // data.push({ether: datapoints})
// // };

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
