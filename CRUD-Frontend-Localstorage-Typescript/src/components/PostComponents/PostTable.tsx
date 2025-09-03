import { useAppDispatch, useAppSelector } from "@/app/Hooks/hooks";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { clearPosts, deletePost, type Post } from "@/app/slices/postSlice";
import { FaBackwardStep } from "react-icons/fa6";
import { FaStepForward } from "react-icons/fa";
import toast from "react-hot-toast";

interface PostTableProps {
  searchTerm: string;
  departmentFilter: string;
}


const PostTable: React.FC<PostTableProps> = ({
  searchTerm,
  departmentFilter,
}) => {
  const posts = useAppSelector((state) => state.posts.items);
  const dispatch = useAppDispatch();


  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 3; // change this value for page size

  const handleDelete = (id: string) => {
    dispatch(deletePost(id));
    toast.success("Post Deleted successfully");
  };

  // filter
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      departmentFilter === "all" || post.department === departmentFilter;

    return matchesSearch && matchesDepartment;
  });

  const handleClearPosts = () => {
    dispatch(clearPosts());
    toast.success("All posts deleted ");
  };

  // pagination logic
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(
    startIndex,
    startIndex + postsPerPage,
  );

  if (posts.length === 0) {
    return (
      <div className="mt-10 text-center text-gray-500 italic">
        No posts available
      </div>
    );
  }

  return (
    <div className="overflow-x-auto mt-10 p-4">
      <div className="flex justify-between items-center mb-4 px-4">
        <span className="text-gray-600 text-sm">
          Showing {startIndex + 1}–
          {Math.min(startIndex + postsPerPage, filteredPosts.length)} of{" "}
          {filteredPosts.length}
        </span>

        {/* .............................Clear all posts */}
        <Button
          onClick={handleClearPosts}
          className="bg-red-500 hover:bg-red-600"
        >
          Clear All
        </Button>
      </div>
      <div className="mb-3 px-5 text-xl text-gray-600">
        No.of Students :{" "}
        <span className="bg-blue-500 p-1 rounded-full px-3 text-white">
          {" "}
          {posts.length}
        </span>
      </div>

      <table className="min-w-full  border border-gray-200 rounded-lg shadow-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left font-thin text-blue-500">
              Sl.no
            </th>
            <th className="px-4 py-2 text-left font-thin text-blue-500">
              Name
            </th>
            <th className="px-4 py-2 text-left font-thin text-blue-500">
              Email
            </th>
            <th className="px-4 py-2 text-left font-thin text-blue-500">Age</th>
            <th className="px-4 py-2 text-left font-thin text-blue-500">
              Department
            </th>
            <th className="px-4 py-2 text-center font-thin text-blue-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedPosts.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-500 italic">
                No Matches Found
              </td>
            </tr>
          ) : (
            paginatedPosts.map((post, index) => (
              <tr
                key={post.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-4 ">{startIndex + index + 1}.</td>
                <td className="px-4 text-sm">{post.name}</td>
                <td className="px-4 text-sm ">{post.email}</td>
                <td className="px-4 text-sm ">{post.age}</td>
                <td className="px-4 text-sm ">{post.department}</td>
                <td className="px-4 text-center">
                  <div className="flex gap-3 px-2 p-3">
                    <Button
                      onClick={() => setEditingPost(post)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md shadow-sm"
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      onClick={() => handleDelete(post.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md shadow-sm"
                    >
                      <RiDeleteBin5Fill />
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 gap-2">
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-3 py-1 bg-blue-400 hover:bg-blue-500"
        >
          <FaBackwardStep />
        </Button>
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 ${
              currentPage === i + 1
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
          >
            {i + 1}
          </Button>
        ))}
        <Button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-3 py-1 bg-blue-400 hover:bg-blue-500"
        >
          <FaStepForward />
        </Button>
      </div>
    </div>
  );
};

export default PostTable;
