import React, { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router'

export default function Home() {
    const [newpassword, setPassword] = useState("");
    const [otp, setotp] = useState(null);
    const [state, setstate] = useState(false);
    const router = useRouter();

    const {query:{wegetemail}}=router;
    const props = {
        wegetemail
    }

    const email = props.wegetemail;

    async function send(e) {
        if (newpassword) {
                const res = await axios.post("http://localhost:8000/newpassword", {
                    newpassword,
                    email
                })
                .then(console.log("success"))
                .catch(err => console.log("we got error"))
                
                if(res.status==200){
                    router.push("/login");
                }
    }
    }

    return (
        <>
            <div className="flex">
                <div className="w-6/12 h-screen">
                    <img className="w-2/12 mx-14 my-5" src="/stackoverflow.jpg" alt="" />
                    <div className="w-3/5 m-auto mt-10">
                        <h1 className="flex justify-center pb-10 text-2xl font-medium">Reset Password</h1>
                        <label htmlFor="">Enter new password</label><br />
                        <input type="text" className="border-2 pr-64 py-1 pl-2  rounded mb-4 shadow-md focus:outline-blue-600" value={newpassword} onChange={e => setPassword(e.target.value)} /><br />
                        {/* <label id="otp" htmlFor="" className="hidden">Enter Otp</label><br /> */}
                        {/* <input  id="otp" type="text" className="border-2 pr-64 py-1 pl-2  rounded mb-4 shadow-md focus:outline-blue-600" value={otp} onChange={e => setotp(e.target.value)} /><br /> */}
                        {/* <label htmlFor="">Password</label><br /> */}
                        {/* <input type="password" className="border-2 pr-64 py-1 pl-2  rounded shadow-md focus:outline-blue-600" value={password} onChange={e => setPassword(e.target.value)} /><br /> */}
                        <button className="bg-blue px-48 py-1 mt-8 ml-2 bg-blue-500 text-white rounded-md " onClick={send}>reset</button>
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
