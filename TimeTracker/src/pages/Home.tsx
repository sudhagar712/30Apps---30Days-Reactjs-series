import React, { useState } from 'react'
import TimeTrackForm from '../components/TimeTrackForm'
import ChartDisplay from '../components/ChartDisplay'

const Home = () => {

const [data, setData] = useState<{activity:string, hours:number}[]>([])


const handleAdd = (activity:string, hours:number) => {
 setData((prev)=> [...prev, {activity, hours}])
 console.log(data)
}


  return (
    <div className="bg-white flex flex-col justify-center items-center  p-3 space-y-3">
      <h2 className="text-center text-2xl font-bold mb-3 ">TimeTracker</h2>
      <div className='flex flex-col gap-5'>
        <TimeTrackForm onAdd={handleAdd} />
        <ChartDisplay data={data} />
      </div>
    </div>
  );
}

export default Home
