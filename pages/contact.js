import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen  bg-another bg-cover">
      <div>
        <p className="text-center text-xl pt-7 font-bold">Contact Us</p>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center mt-14 gap-14 border-2 w-2/3 mx-auto p-4 border-black rounded-md ">
        <div className="flex flex-col gap-10">
          <input
            placeholder="Full Name"
            className="outline-0 border-b-2 text-sm border-black rounded-md"
            type="text"
          />
          <input
            placeholder="Email"
            className="outline-0 border-b-2 text-sm border-black rounded-md"
            type="text"
          />
          <input
            placeholder="Message"
            className="outline-0 border-b-2 text-sm border-black rounded-md"
            type="text"
          />
          <button className="text-white bg-slate-800 rounded-md w-1/3 mx-auto font-bold">
            Send
          </button>
        </div>
        <div className="flex flex-col gap-10 text-blue-400 font-bold">
          <div className="mb-1">
            <p className="mb-1 font-bold text-lg">Contact E-mail</p>
            <p>homeland@design.com</p>
          </div>

          <div>
            <p className="mb-1 font-bold  text-lg">Based In</p>
            <p>Durban, South Africa</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
