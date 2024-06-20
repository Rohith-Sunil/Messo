import React, { useState } from "react";

function ContactForm() {
  const [messageType, setMessageType] = useState("complaint");

  const handleTypeChange = (e) => {
    setMessageType(e.target.value);
  };

  return (
    <div className="max-h-screen bg-neutral-200 flex items-center justify-center p-10">
      <div className="max-w-2xl w-full bg-neutral-900 p-10 rounded-lg shadow-lg mb-28">
        <h2 className="text-3xl font-bold text-white mb-6">
          Complaints & Suggestions
        </h2>
        <p className="text-gray-400 mb-6">
          Have concerns about the hostel mess? Want to provide feedback on meal
          quality or suggest improvements? We're here to help. Let us know.
        </p>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-400">
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="w-full mt-2 p-3 bg-gray-700 rounded text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-600"
              placeholder="name@iiitm.ac.in"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="subject" className="block text-gray-400">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              className="w-full mt-2 p-3 bg-gray-700 rounded text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Let us know how we can help you"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="messageType" className="block text-gray-400">
              Message Type
            </label>
            <div className="flex mt-2">
              <label className="text-gray-400 mr-4">
                <input
                  type="radio"
                  name="messageType"
                  value="complaint"
                  checked={messageType === "complaint"}
                  onChange={handleTypeChange}
                  className="mr-2"
                />
                Complaint
              </label>
              <label className="text-gray-400">
                <input
                  type="radio"
                  name="messageType"
                  value="suggestion"
                  checked={messageType === "suggestion"}
                  onChange={handleTypeChange}
                  className="mr-2"
                />
                Suggestion
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-400">
              Your message
            </label>
            <textarea
              id="message"
              rows="10"
              className="w-full mt-2 p-3 bg-gray-700 rounded text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Leave a comment..."
            ></textarea>
          </div>
          {/* <div className="mb-6">
            <label htmlFor="image" className="block text-gray-400">
              Upload an image
            </label>
            <input
              type="file"
              id="image"
              className="w-full mt-2 p-3 bg-gray-700 rounded text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div> */}
          <button
            type="submit"
            className="w-full p-3 bg-teal-600 text-white rounded hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Send message
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
