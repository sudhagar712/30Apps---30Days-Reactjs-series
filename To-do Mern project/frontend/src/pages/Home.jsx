import React from 'react'
import {Link} from "react-router-dom"
import {motion} from "framer-motion"

const Home = () => {
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white flex flex-col justify-center items-center ">
      <motion.h1
        className="text-white text-5xl md:text-7xl font-bold text-center  mb-6 "
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        Build your Crud Magic💫
      </motion.h1>

      <motion.p
        className="text-gray-300 text-xl md:text-2xl text-center mb-10 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.9 }}
      >
        Learn Crud Operations step-by-step with a beautiful UI made for
        begineers 🚀
      </motion.p>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <Link
          to="todo"
          className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-md"
        >
          Start Learning Now
        </Link>
      </motion.div>
    </div>
  );
}

export default Home
