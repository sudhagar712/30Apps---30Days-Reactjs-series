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
import { addPost, updatePost } from "@/app/slices/postSlice";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { useState } from "react";

interface PostFormProps {
  editingPost?: any;
  onClose?: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ editingPost, onClose }) => {
  const [formData, setFormData] = useState({
    name: editingPost?.name || "",
    email: editingPost?.email || "",
    age: editingPost?.age?.toString() || "",
    department: editingPost?.department || "",
  });

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelect = (value: string) => {
    setFormData({ ...formData, department: value });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.age || !formData.department) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    if (editingPost) {
      // update
      dispatch(
        updatePost({
          id: editingPost.id,
          name: formData.name,
          email: formData.email,
          age: Number(formData.age),
          department: formData.department,
        })
      );
      toast.success("Post updated successfully");
      if (onClose) onClose();
    } else {
      // add
      dispatch(
        addPost({
          id: uuidv4(),
          name: formData.name,
          email: formData.email,
          age: Number(formData.age),
          department: formData.department,
        })
      );
      toast.success("Post added successfully");
      setFormData({ name: "", email: "", age: "", department: "" });
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="flex gap-5 flex-col">
        <Input name="name" value={formData.name} onChange={handleChange} placeholder="Enter a name" />
        <Input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Enter email" />
        <Input name="age" value={formData.age} onChange={handleChange} type="number" placeholder="Enter age" />
        <Select value={formData.department} onValueChange={handleSelect}>
          <SelectTrigger>
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="EEE">EEE</SelectItem>
            <SelectItem value="MECH">MECH</SelectItem>
            <SelectItem value="IT">IT</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleSubmit} className="w-full mt-4 bg-blue-500 hover:bg-blue-600">
          {loading ? "Loading..." : editingPost ? "Update Post" : "Add Post"}
        </Button>
        {editingPost && (
          <Button onClick={onClose} className="w-full mt-2 bg-gray-400 hover:bg-gray-500">
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
};

export default PostForm;
