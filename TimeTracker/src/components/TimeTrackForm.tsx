import React,{useState} from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button';



interface Props {
    onAdd:(activity:string, hours:number) => void
}


const TimeTrackForm = ({ onAdd }:Props) => {
  const [activity, setActivity] = useState("");
  const [hours, setHours] = useState("");

const handleSubmit = () => {
    if(!activity.trim() ||  !hours.trim()) alert("please fill both field")

         onAdd(activity, Number(hours))
        setActivity("")
        setHours("")
}




  return (
    <div className="">
      <Input
        type="text"
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
        className="mb-3"
        placeholder="Enter your activity "
      />

      <Input
        type="number"
        value={hours}
        onChange={(e) => setHours(e.target.value)}
        className="mb-3"
        placeholder="Enter a Hours"
      />
      <Button onClick={handleSubmit} className="w-full">
        Add Activity
      </Button>
    </div>
  );
};

export default TimeTrackForm
