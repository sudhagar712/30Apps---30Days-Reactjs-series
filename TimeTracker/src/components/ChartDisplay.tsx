import React from 'react'
import { Pie } from 'react-chartjs-2'
import{Chart as ChartJS, ArcElement, Legend, Tooltip} from "chart.js"


ChartJS.register(ArcElement, Legend, Tooltip)


interface Props{
    data:{activity:string, hours:number} []
}


const ChartDisplay = ({data}:Props) => {

const chartDisplay = {
  labels: data.map((d) => d.activity),
  datasets: [
    {
      label: "Hours",
      data: data.map((d) => d.hours),
      backgroundColor: ["#FF0000", "#FFFF00", "#000000", "#FFA500", "#FFC0CB"],
      borderWidth:1,
    },
  ],
};

  return <Pie data={chartDisplay}/>
}

export default ChartDisplay

