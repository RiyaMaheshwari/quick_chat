import React, { useContext, useState } from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
  const {authUser, updateProfile} = useContext(AuthContext);
  console.log("authUser",authUser);

  const [selectedProfilePic, setSelectedProfilePic] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState(authUser.fullName);
  const [bio, setBio] = useState(authUser.bio);

  const handleSubmit = async(e)=> {
    e.preventDefault();
    if(!selectedProfilePic){
      await updateProfile({fullName: name, bio});
      navigate('/');
      return;
    } 
    const reader = new FileReader();
    reader.readAsDataURL(selectedProfilePic);
    reader.onload = async ()=>{
      const base64Image = reader.result;
      await updateProfile({profilePic: base64Image, fullName: name, bio});
      navigate('/');
    }
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
                  : authUser?.profilePic || assets.avatar_icon
              }
              className={`w-12 h-12 ${(authUser?.profilePic || selectedProfilePic) && "rounded-full"}`}
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
        <img className={`max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10 ${selectedProfilePic && 'rounded-full'}`} src={authUser?.profilePic || assets.avatar_icon} alt=""/>
      </div>
    </div>
  );
};

export default Profile;
