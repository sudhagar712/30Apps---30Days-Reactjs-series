import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch } from "react-redux";
import { addPost } from "@/app/slices/postSlice";

import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

const PostForm = () => {

   const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    department: "",
   })

   const[loading, setLoading] = useState(false)

  const dispatch = useDispatch()
   
   const handleChange =  (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
   }

   const handleSelect = (value:string) => {
        setFormData({...formData, department : value})
   }


const handleSubmit = () => {
    if(!formData.name || !formData.email || !formData.age || !formData.department){
      toast.error("Please fill all fields ")
        return
    }

    setLoading(true)
   
        dispatch(addPost({
         id: uuidv4(),
         name:formData.name,
         email:formData.email,
         age:Number(formData.age),
         department:formData.department
    }))
           toast.success("Post Add successful")
     setFormData({ name: "", email: "", age: "", department: "" });
      setLoading(false)

  
}

  return (
    <div>
      {/* forms */}
      <div className="flex gap-5 flex-col ">
        <Input name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Enter a name " />
        <Input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Enter a email " />
        <Input name="age" value={formData.age} onChange={handleChange} type="number" placeholder="Enter a age" />
        <Select value={formData.department} onValueChange={handleSelect}>
          <SelectTrigger className="w-full ">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="EEE">EEE</SelectItem>
            <SelectItem value="MECH">MECH</SelectItem>
            <SelectItem value="IT">IT</SelectItem>
          </SelectContent>
        </Select>
        <div className="">
          <Button onClick={handleSubmit} className="w-full mt-4  cursor-pointer bg-blue-500 hover:bg-blue-600 shadow-md rounded-md ">
            {loading? "Loading....." : "Add Post"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
