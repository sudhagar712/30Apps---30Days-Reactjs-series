import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import {useState}from "react";

const MessageForm = () => {
  const [message, setMessage] = useState<string>("");
  const [delay, setDelay] = useState<number>(10);
  const [isSending, setIsSending] = useState<boolean>(false);
 const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [sendMessage, setSendMessage] = useState<string>("");

  const handleSend = () => {
    setIsSending(true);

    const id = setTimeout(() => {
      setSendMessage(message);
      setMessage("");
      setIsSending(false);
    }, delay * 1000);

   setTimerId(id)
  };


const handleCancel = () => {
    if(timerId) clearTimeout(timerId)
        setIsSending(false)
}



  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-md shadow-lg bg-white space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Dm Delay Button</h2>

      <Textarea
        placeholder="Enter your message here.."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <Input
        placeholder="Delay in 5s"
        value={delay}
        onChange={(e) => setDelay(Number(e.target.value))}
        disabled={isSending}
      />

      {!isSending ? (
        <Button onClick={handleSend} className="w-full">
          Sent with Delay
        </Button>
      ) : (
        <Button variant="destructive"  className="w-full " onClick={handleCancel}>
          Cancel Sending
        </Button>
      )}


{
    sendMessage && (
        <div className="bg-green-300 text-green-500 p-3 ">
            <p>Message sent :</p>
            <p>{sendMessage}</p>
        </div>
    )
}


    </div>
  );
};

export default MessageForm;
