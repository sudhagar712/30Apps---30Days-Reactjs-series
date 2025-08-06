import MoodInputField from "@/components/MoodInputField";
import MoodOutputField from "@/components/MoodOutputField";
import { useState } from "react";

const Home = () => {
    
    const[mood, setMood] = useState("");
    const[subject, setSubject] = useState("");
    const[footer, setFooter] = useState("");
    const[generate, setGenerate] = useState(false)

    
const handleGenerate = () => {

    const lowerMood = mood.toLowerCase()
   
    if(lowerMood.includes("happy")){
        setSubject("Feeling Great Today");
        setFooter("Stay Awesome")
    }else if(lowerMood.includes("sad")){
      setSubject("Don't worry be happy");
     setFooter("All is well Don't be sad ");
    }
    else if(lowerMood.includes("cry")){
  setSubject("don't Cry please");
  setFooter("One day u never Cry");
    }
    else{
        setSubject("Mood Update");
        setFooter("we will catch later");
    }

    setGenerate(true)
}


const handleReset = () => {
  setMood("")
  setSubject("")
    setFooter("")
   setGenerate(false);
}



  return (
    <div className="max-w-xl mx-auto mt-20 bg-white  shadow-sm rounded-md space-y-3 p-5 px-3 ">
      <h2 className="font-bold text-center text-3xl ">MoodMailer</h2>

      {!generate ? (
        <MoodInputField
          mood={mood}
          setMood={setMood}
          onGenerate={handleGenerate}
          disabled={generate}
        />
      ) : (
        <MoodOutputField
          subject={subject}
          footer={footer}
          onReset={handleReset}
        />
      )}
    </div>
  );
};

export default Home;
