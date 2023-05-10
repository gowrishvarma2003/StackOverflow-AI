import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import axios from "axios";

export default function answer(){
    const router = useRouter();
    const[useranswer , setuseranswer] = useState(null);
    const [allanswers , setallanswer] =useState(null);
    const {query:{question },}=router;
    const props = {
        question
    }
    const viewquestion = props.question

    function post(){
        if(useranswer){
            const postanswer = async()=>{
                const res = await axios.post('http://localhost:8000/answer',{
                    viewquestion,
                    useranswer
                });
                console.log(res.data);
                console.log("posted");
            }
            postanswer();
        }
    }



    return(
        <>
            <div className="bg-zinc-100 h-fill pb-10">
                <div className="flex justify-center pt-2 pb-1 border-b-2">
                    <img className="w-40 mr-10" src="/Stack_Overflow.png" alt="" />
                    <h1 className="pt-1.5 mr-60 text-sm cursor-pointer pr-6">My questions</h1>
                    <input className="w-96 mr-80 pl-4 h-8 pb-1 mt-1  border-2  focus:outline-none" type="text" placeholder="search..."></input>
                    <img className="w-10 h-10 rounded-full cursor-pointer" src="\profile.jpg" alt="" />
                </div>
                <div className="flex">
                    <h1 className="m-auto text-3xl font-medium">Write Your Answer</h1>
                    <img className="w-6/12 m-auto" src="./question.png" alt="" />
                </div>
                <div className="ml-28 mt-16 border-2 w-7/12 bg-white px-16 py-10">
                    <h1 className="font-medium">Answer</h1>
                    <p className="text-md text-blue-500">Question:-{viewquestion}</p>
                    <textarea className="border-2 w-11/12 py-1 mt-4 focus:outline-blue-600 rounded-md pl-4" cols="100" rows="10" placeholder="Write Your answer hear..." type="text"  onChange={e=>setuseranswer(e.target.value)}/><br />
                    <button className="border-2 px-6 py-1 mt-4 bg-blue-500 text-white" onClick={post}>Post</button>
                </div>
            </div>
        </>
    );
}