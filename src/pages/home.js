import { useRouter } from 'next/router'
import axios from "axios";
import { useState, useEffect } from "react";

export default function home(){
    const [alldata , setdata] = useState(null);
    const router = useRouter();
    function ask(){
        router.push('/ask');
    }

    useEffect(() => {
        const getdata = async () => {
            const res = await axios.get("http://localhost:8000/home");
            const data = res.data;
            console.log(data)
            console.log(data);
            setdata(data);
        };
        getdata();
    }, []);

    const handleredirect = (value) =>{
        const question = value;
        // console.log(value)
        router.push({
                pathname: '/view',
                query: {
                    question,
                }
            })
    }

    if(!alldata){
        return(
            <div>Loading..</div>
        )
    }

    return(
        <>
            <div className="flex justify-center mt-2 pb-1 border-b-2">
                <img className="w-28 mr-10" src="/stackoverflow.jpg" alt="" />
                <h1 className="pt-1.5 mr-60 text-sm cursor-pointer pr-6">My Questions</h1>
                <input className="w-96 mr-80 pl-4 h-8 pb-1  border-2  focus:outline-blue-600" type="text" placeholder="search..."></input>
                <img className="w-10 rounded-full cursor-pointer" src="\profile.jpg" alt="" />
            </div>
            <div className="w-6/12 m-auto border-b-2 border-gray-300 pb-4 px-6">
                        <div className="flex  justify-between pt-4">
                            <h1 className="text-3xl">All Questions</h1>
                            <button className="bg-blue-500 text-white text-xs px-6 rounded-md drop-shadow" type="submit" onClick={ask}>Ask Question</button>
                        </div>
                        <div className="flex justify-between pt-6">
                            <h1 className="text-2xl">X Questions</h1>
                            <div><button className="border-2 px-4 py-1 drop-shadow">recent</button><button className="border-2 px-6 py-1 drop-shadow">liked</button></div>
                        </div>
                    </div>
            <div className="flex w-full border-x-20 border-gray-300">
                <div className="w-6/12 ">
                    <div className='h-full w-11/12 pl-48 border-r-2 border-gray overflow-y-scroll'>
                        <p className='cursor-pointer  hover:text-blue-500' onClick={()=>{router.push('/home')}}>Home</p><br /> 
                        <p className='cursor-pointer hover:text-blue-500' >Liked</p><br />
                        <p className='cursor-pointer hover:text-blue-500' >My answers</p>
                    </div>
                </div>
                <div className="w-full">
                    <div>
                    </div>
                    {alldata.map((value) => {
                        return <div className="px-10 py-4  border-b-2" key={value.question}>
                            <div className="text-blue-600 text-lg cursor-pointer" onClick={()=>handleredirect(value.question)}>{value.question}</div>
                            <div className="line-clamp-2">{value.answer}</div>
                        </div>;
                    })}
                </div>
                <div className="w-6/12"></div>
            </div>
        </>
    );
}