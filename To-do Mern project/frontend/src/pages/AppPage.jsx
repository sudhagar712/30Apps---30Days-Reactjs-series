import React, { useEffect, useState } from "react";
import { Pencil, Trash } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const AppPage = () => {
  const [text, setText] = useState("");
  const [quote, setQuote] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const getQuotes = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/quote");
      setQuote(res.data);
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };
  useEffect(() => {
    getQuotes();
  }, []);

  const handleAdd = async () => {
    if (!text || !text.trim()) {
      toast.error("Please fill the text fields");
    } else {
      await axios.post("http://localhost:9000/api/quote", { text });
      toast.success("Text added");
      getQuotes();
      setText(" ");
    }
  };

  const startEdit = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };


const handleUpdate = async() => {
    if(!editingText || !editingText){
        toast.error("Please fill the quotes")
    }
    else {
         await axios.put(`http://localhost:9000/api/quote/${editingId}`, {
            text:editingText
         });
         toast.success("Text Updated")
         setEditingId(null)
         setEditingText("")
         getQuotes()
    }
}



const handleCancel = () => {
     setEditingId(null);
     setEditingText("");
}







  const handleDelete = async (id) => {
    if (confirm("Are are sure to Delete?")) {
      await axios.delete(`http://localhost:9000/api/quote/${id}`);
      toast.success("Text deleted ");
      getQuotes();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 md:px-10">
      <Link to="/">
        <h1 className="text-xl md:text-4xl mb-10 mt-10 font-bold  text-purple-700 text-center mb-4  ">
          📝 My Quotes
        </h1>
      </Link>

      {/* create form */}

      <div className="flex items-center md:justify-center   mb-10 gap-3 ">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          className="w-full md:w-[50%] px-4 py-3   rounded-md border border-gray-100 shadow-md outline-none"
          placeholder="Enter your Quotes here ...."
        />
        <div>
          <button
            onClick={handleAdd}
            className="bg-gradient-to-br from-pink-500 to-purple-500 px-5 py-3 text-white shadow-md font-bold  rounded-md"
          >
            Add
          </button>
        </div>
      </div>

      <div className="mt-5 mx-auto max-w-xl space-y-4">
        {quote.length > 0 ? (
          quote.map((q) => (
            <div
              key={q._id}
              className="bg-white text-black shadow-md rounded-lg flex flex-col px-3 p-3"
            >
              {editingId === q._id ? (
                <div className="flex justify-between gap-5 w-full items-center">
                  <input
                    className="w-full px-3 py-2 border rounded-md"
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />

                  <div className="flex gap-3 items-center ">
                    <button
                      onClick={handleUpdate}
                      className="bg-green-400 text-white px-3 py-2 rounded-md"
                    >
                      save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-red-500 text-white px-3 py-2 rounded-md "
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between w-full items-center">
                  <p className="max-w-sm text-xs">
            
                    <em>{q.text}</em>
                  </p>

                  <div className="flex gap-4">
                    <button
                      onClick={() => startEdit(q._id, q.text)}
                      className="flex items-center gap-1 text-blue-500 text-sm hover:text-blue-600"
                    >
                      <Pencil size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(q._id)}
                      className="flex items-center gap-1 text-red-500 text-sm hover:text-red-600"
                    >
                      <Trash size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 md:text-3xl mt-[100px]">
            No quotes found 🚫
          </p>
        )}
      </div>
    </div>
  );
};

export default AppPage;
