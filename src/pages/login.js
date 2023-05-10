import React, { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router'

export default function Home() {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const router = useRouter();

    async function send(e) {
        if (email && password) {
            const res = await axios.post("http://localhost:8000/login", {
                email: email,
                password: password
            })
                .then(console.log("Sent to server succesfully"))
                .catch((err) => console.log(err));

            if (res.status == 200 && email && password) {
                router.push({
                    pathname: '/home',
                    query: {
                        name,
                        email
                    }
                });
            }
        }


    }

    function login() {
        router.push('/')
    }

    function forgetpassword(){
        router.push('/resetpassword');
    }

    return (
        <>
            <div className="flex">
                <div className="w-6/12 h-screen">
                    <img className="w-2/12 mx-14 my-5" src="/stackoverflow.jpg" alt="" />
                    <div className="w-3/5 m-auto mt-10">
                        <h1 className="flex justify-center pb-10 text-2xl font-medium">Log In</h1>
                        <label htmlFor="">Mail</label><br />
                        <input type="text" className="border-2 pr-64 py-1 pl-2  rounded mb-4 shadow-md focus:outline-blue-600" value={email} onChange={e => setEmail(e.target.value)} /><br />
                        <label htmlFor="">Password</label><br />
                        <input type="password" className="border-2 pr-64 py-1 pl-2  rounded shadow-md focus:outline-blue-600" value={password} onChange={e => setPassword(e.target.value)} /><br />
                        <p className="pl-80 ml-4 mt-2 text-sm cursor-pointer text-blue-600" onClick={forgetpassword}>Forgot Password</p>
                        <button className="bg-blue px-48 py-1 mt-4 ml-2 bg-blue-500 text-white rounded-md " onClick={send}>Log In</button>
                        <h2 className="flex justify-center first-letter mt-8 text-sm text-gray-500">If you already had an account <span> <a className="text-blue-700 pl-2 font-medium cursor-pointer" onClick={login}> Sign Up</a></span></h2>
                        <h2 className="flex justify-center mt-8 text-sm text-gray-500">By creating our account you agree our <span> <a className="text-blue-700 pl-2 pr-2 font-medium">Terma</a></span>and<span> <a className="text-blue-700 pl-2 font-medium">condition</a></span></h2>
                    </div>
                </div>
                <div className="w-6/12">
                    <img className="w-full h-screen" src="/loginbg.webp" alt="" />
                </div>
            </div>
        </>
    );
}
