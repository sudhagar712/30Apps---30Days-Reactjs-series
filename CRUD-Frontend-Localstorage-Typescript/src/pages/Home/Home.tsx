import { useAppDispatch } from "@/app/Hooks/hooks";
import { clearPosts } from "@/app/slices/postSlice";
import Post from "@/components/PostComponents/Post";
import PostTable from "@/components/PostComponents/PostTable";

import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
    const [departmentFilter, setDepartmentFilter] = useState<string>("all");



  return (
    <div className="md:p-5 md:px-7 mt-3">
      <div className="md:flex  md:gap-6 px-6  ">
        <h1 className="text-3xl mb-6  font-bold w-[50%] text-blue-500">
          CRUD Applications
        </h1>

        {/* ......................Search input .............................................................. */}
        <Input
          className="bg-white p-4  "
          value={searchTerm}
          placeholder="Search students name or department"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
        />


          <Select
          onValueChange={(value) => setDepartmentFilter(value)}
          defaultValue="all"
        >
          <SelectTrigger className="w-[200px] ml-4">
            <SelectValue placeholder="Filter by Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="EEE">EEE</SelectItem>
            <SelectItem value="MECH">MECH</SelectItem>
            <SelectItem value="IT">IT</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/*  */}
      

      <div className="grid grid-cols-1 md:grid-cols-2 p-3  ">
        <div>
          <Post />
        </div>

        {/* post items */}
        <div className="p-4  ">
          <h1 className="text-3xl font-thin mb-3  ">Details of Students</h1>
          <PostTable searchTerm={searchTerm} departmentFilter={departmentFilter}/>
        </div>
      </div>
    </div>
  );
};

export default Home;
