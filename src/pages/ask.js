import { Configuration , OpenAIApi } from "openai"
import { useEffect, useState } from "react"
import { useRouter } from 'next/router'

import axios from "axios";

const openai = new OpenAIApi(new Configuration({
    apiKey: "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",
}))

export default function ask(){
    const [question , setquestion] =useState("");
    const [answer , setanswer] = useState(null);
    const router = useRouter();

    async function  post(){
        if(question){
            const getresponce = async()=>{
                const response = await openai.createCompletion({
                    model: "text-davinci-003",
                    prompt: question,
                    temperature: 0,
                    max_tokens: 2048
                });
                setanswer(response.data.choices[0].text)
                console.log(response.data.choices[0].text)
            };
            getresponce();
        }
    }

    useEffect(()=>{
        if(answer){
            const postanswer = async()=>{
                const res = await axios.post('http://localhost:8000/ask',{
                    question,
                    answer
                });
                console.log("send");
                // router.push('/home');
            }
            postanswer();
          }
          setanswer(null);
    },[answer])


    return(
        <>
            <div className="bg-zinc-100 h-screen">
                <div className="flex justify-center pt-2 pb-1 border-b-2">
                    <img className="w-40 mr-10 cursor-pointer" onClick={()=>{router.push('/home')}} src="/Stack_Overflow.png" alt="" />
                    <h1 className="pt-1.5 mr-60 text-sm cursor-pointer pr-6">My questions</h1>
                    <input className="w-96 mr-80 pl-4 h-8 pb-1 mt-1  border-2  focus:outline-none" type="text" placeholder="search..."></input>
                    <img className="w-10 h-10 rounded-full cursor-pointer" src="\profile.jpg" alt="" />
                </div>
                <div className="flex">
                    <h1 className="m-auto text-3xl font-medium">Ask a public question</h1>
                    <img className="w-6/12 m-auto" src="./question.png" alt="" />
                </div>
                <div className="ml-28 mt-16 border-2 w-7/12 bg-white px-16 py-10">
                    <h1 className="font-medium">Ask</h1>
                    <p className="text-sm">Be specific and imagine you're asking a question to another person.</p>
                    <input className="border-2 w-11/12 py-1 mt-4 focus:outline-blue-600 rounded-md pl-4" placeholder="e.g. write an cpp code for matrix multiplication" type="text" onChange={e=>setquestion(e.target.value)}/><br />
                    <button className="border-2 px-6 py-1 mt-4 bg-blue-500 text-white" onClick={post}>Post</button>
                </div>
                {/* <div
             className="font-mono bg-gray-100">
                    {answer}
                </div> */}
            </div>
        </>
    );
}