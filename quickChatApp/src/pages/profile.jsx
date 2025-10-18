import React, { useState } from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [selectedProfilePic, setSelectedProfilePic] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState("Riya");
  const [bio, setBio] = useState("Hi everyone, I am using quick chat");

  const handleSubmit = async(e)=> {
    e.preventDefault();
    navigate('/');
  }

  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
      <div className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-100 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-10 flex-1">
          <h3 className="text-lg">Profile details</h3>
          <label
            htmlFor="avatar"
            className="flex items-center gap-3 cursor-pointer"
          >
            <input
              onChange={(e) => setSelectedProfilePic(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".png, .jpeg, .jpg"
              hidden
            />
            <img
              src={
                selectedProfilePic
                  ? URL.createObjectURL(selectedProfilePic)
                  : assets.avatar_icon
              }
              className={`w-12 h-12 ${selectedProfilePic && "rounded-full"}`}
            />
            upload profile image
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            required
            placeholder="Your name"
            className="p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus: ring-blue-400"
          />
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            rows={4}
            className="p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Write profile bio"
            required
          ></textarea>
          <button
            type="submit"
            className="p-2 bg-gradient-to-r from-blue-400 to-blue-950/100  text-white rounded-full text-lg cursor-pointer "
          >Save</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
