import React from 'react'
import logo from "../Assets/logo.png";
import banner from "../Assets/Login_banner.png"
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Login() {

  const [email, setEmail] = useState(" ");
  const [password,setPassword] = useState(" ");
  const handleSubmit = async(e)=>{
    e.preventDefault()
    const data = {
      email,password
    }
    console.log(data);
    try {
            
            await fetch('http://localhost:6969/api/auth/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json;charset=utf-8',
                },
                body: JSON.stringify(data),
            })
            .then(res=>res.json()).then((result)=>{
                console.log(result);
                localStorage.setItem('jwt',result.token);
                if(data.admin===0){
                  window.location.replace('/create')
                }
                else{
                  console.log("here")
                  window.location.replace('/contest')
                }
                
            })
    } catch (error) {
            console.log("error",error);
        }
  }

  return (
    <div className="h-screen bg-[#01042D]">
      <div className="flex justify-between">
        <div>
          <img
            src={logo}
            className="pr-3 pl-5 h-14 pt-4 cursor-pointer hover:scale-105 duration-300 "
          />
        </div>
        <div className="mt-4 pr-6">
          <Link to="/">
            <button className="text-white border-2 border-[#B64320] hover:scale-110 duration-300 rounded-lg px-6 py-1 mx-3">
              HOME
            </button>
          </Link>
          <Link to="/register">
            <button className="text-white border-2 border-[#B64320] hover:scale-110 duration-300 rounded-lg px-6 py-1 mx-3">
              SignUp
            </button>
          </Link>
        </div>
      </div>
      {/* <form> */}
      <div className="bg-[#1B263B] h-[75%] my-[3rem] mx-[12rem] rounded-2xl flex flex-col items-center">
        <div className="text-[2.7rem] text-white mt-2">LOGIN</div>
        <div className="flex items-center justify-center w-full my-7">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center w-[50%] justify-around h-[100%] border-r-2 border-[#A1A1A1] px-4 py-6 pt-14"
          >
            <div className="flex flex-col w-full items-center justify-around h-[80%]">
              <input
                placeholder="E-mail"
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="w-[75%] bg-[#1B263B] text-[#A1A1A1] border-0 border-b-2 border-[#A1A1A1] placeholder:text-[#A1A1A1] text-xl placeholder:text-2xl placeholder:text-center"
              />
              <div className="w-full flex flex-col justify-center items-center gap-[1rem]">
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="w-[75%] bg-[#1B263B] text-[#A1A1A1] border-0 border-b-2 border-[#A1A1A1] placeholder:text-[#A1A1A1] text-xl placeholder:text-2xl placeholder:text-center"
                />
                <div className=" text-white w-[75%]">
                  By proceeding, You agree with our{" "}
                  <span className="text-[#FFA900]">
                    {" "}
                    <a className="hover:underline cursor-pointer">
                      {" "}
                      Terms of Service <span className="text-white">
                        &
                      </span>{" "}
                      Conditions
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <div className="h-[20%] flex flex-col justify-end">
              <button className="py-1 px-12 text-white bg-[#B64320] rounded-3xl text-xl hover:scale-110 duration-300">
                LOGIN
              </button>
            </div>
          </form>
          <div className="w-[50%] flex justify-center items-center">
            <img src={banner} />
          </div>
        </div>
      </div>
      {/* </form> */}
    </div>
  );
}

export default Login