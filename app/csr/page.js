"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaBars, FaTimes, FaHome, FaInfoCircle, FaUsers } from "react-icons/fa";

function Page() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpenModal(false);
      }
    };
    if (openModal) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openModal]);

  function handleModal() {
    setOpenModal(!openModal);
  }

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900 font-sans antialiased">
      <div
        className={`fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-all duration-500 flex items-center justify-center z-50 ${
          openModal ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div ref={modalRef} className="bg-white rounded-xl p-8 shadow-2xl">
          <h2 className="text-lg font-semibold text-gray-900">Modal Opened</h2>
          <p className="text-sm text-gray-600 mt-2">Click outside to close</p>
          <button
            className="absolute top-4 right-4 p-2 hover:bg-gray-200 rounded-full transition-colors duration-200"
            onClick={handleModal}
          >
            <FaTimes size={14} className="text-gray-600" />
          </button>
        </div>
      </div>

      <button
        className="fixed top-6 left-6 z-50 p-2 bg-white rounded-md hover:bg-gray-200 transition-colors duration-200 shadow-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? (
          <FaTimes size={16} className="text-gray-900" />
        ) : (
          <FaBars size={16} className="text-gray-900" />
        )}
      </button>

      <div className="flex-1 flex transition-all duration-500 ease-in-out">
        <aside
          className={`h-screen bg-white px-6 pt-20 overflow-x-hidden transition-all duration-500 ease-in-out shadow-md ${
            sidebarOpen ? "w-72" : "w-0 translate-x-[-100%]"
          }`}
        >
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            Management App
          </h2>
          <nav className="mt-10">
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="flex items-center text-sm text-gray-600 hover:text-gray-900 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  <FaHome className="mr-3" />
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center text-sm text-gray-600 hover:text-gray-900 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  <FaInfoCircle className="mr-3" />
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center text-sm text-gray-600 hover:text-gray-900 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  <FaUsers className="mr-3" />
                  Users
                </a>
              </li>
              <li>
                <p
                  onClick={handleModal}
                  className="flex items-center text-sm text-gray-600 hover:text-gray-900 py-2 px-3 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors duration-200"
                >
                  <FaInfoCircle className="mr-3" />
                  Open Modal
                </p>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="flex-1 p-10 transition-all duration-500 ease-in-out">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Welcome to Management App
            </h1>
            <p className="text-sm text-gray-600 mt-3 leading-relaxed">
              Explore the sidebar to get started with your management tasks.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Page;
