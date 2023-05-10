import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import axios from "axios";

export default function view(){
    const router = useRouter();
    const [answer , setanswer] = useState("")
    const [allanswers , setallanswers] = useState([]);
    const [likes , setlikes] = useState(0);

    const {query:{question },}=router;
    const props = {
        question
    }

    const viewquestion = props.question
    // const username = props.name
    console.log(viewquestion)

    useEffect(()=>{
        const getanswer = async ()=>{
            const res = await axios.post('http://localhost:8000/view',{
                viewquestion:viewquestion
            })
            setanswer(res.data.answer)
            // console.log(res.data.useranswers)
        }
        getanswer();
        
    },[])

    useEffect(()=>{
            const getallanswers =  async()=>{
                const response = await axios.post('http://localhost:8000/allanswers',{
                    viewquestion:viewquestion
                })
                const data =await response.data.useranswers;
                if(data){
                    setallanswers(data);
                    console.log(allanswers)
                }
            }
            getallanswers();
    },[])

    function writeanswer(){
        router.push({
            pathname:'/answer',
            query:{
                question:viewquestion
            }
        });
    }

    // function ailike(){
    //     setlikes(likes++);
    // }

    return(
        <>
            <div className="flex justify-center mt-2 pb-1 border-b-2">
                <img className="w-28 mr-10" src="/stackoverflow.jpg" alt="" />
                <h1 className="pt-1.5 mr-60 text-sm cursor-pointer pr-6">My Qustions</h1>
                <input className="w-96 mr-80 pl-4 h-8 pb-1  border-2  focus:outline-blue-600" type="text" placeholder="search..."></input>
                <img className="w-10 rounded-full cursor-pointer" src="\profile.jpg" alt="" />
            </div>
        
            <div className='flex h-full'>
                <div className='w-6/12 mt-24 h-screen'>
                        {/* <div className='h-full w-11/12 pl-40 border-r-2 border-gray overflow-y-scroll'>
                            <p className='cursor-pointer  hover:text-blue-500' onClick={()=>{router.push('/home')}}>Home</p><br /> 
                            <p className='cursor-pointer hover:text-blue-500' >Liked</p><br />
                            <p className='cursor-pointer hover:text-blue-500' >My answers</p>
                        </div> */}
                </div>
                <div className='w-full pt-10'>
                    <div className='text-xl border-b-2 pb-4 text-blue-500'>
                        {viewquestion} 
                        <button className='bg-blue-500 text-white text-xs px-6 py-2 ml-80 rounded-md drop-shadow' onClick={writeanswer}>Answer</button>
                    </div>
                    <h1 className='text-2xl mt-4'>AI-Genetated Answer</h1>
                    {/* <div className='pt-6 pb-6 border-b-2'>{answer}</div> */}
                    <div className='flex'>
                        {/* <div className='pt-10 pr-10'>
                            <img className='w-12 cursor-pointer' src="/like.png" alt="" onClick={ailike}/>
                            <h1 className='flex justify-center text-xl'>{likes}</h1>
                            <img className='w-12 cursor-pointer' src="/dislike.png" alt="" onClick={aidislike}/>
                        </div> */}
                            <div className='w-11/12 pt-6 pb-6 border-b-2'><pre className=' px-10 bg-blue-100 pb-10 rounded-xl'>
                                {answer}</pre>
                            </div>
                    </div>
                    <div>
                        <h1 className='text-2xl mt-4'>Public Answers</h1>
                    <div className='flex'>
                    <div className=''>
                            <img className='w-8 cursor-pointer' src="/like.png" alt=""  />
                            <h1 className='flex justify-center text-xl'>{likes}</h1>
                            <img className='w-8 cursor-pointer' src="/dislike.png" alt="" />
                        </div>
                        <div>
                                {allanswers.map((value) => {
                                return <div className="px-10 py-4  border-b-2" key={value.useranswer}>
                                    <pre className="">{value.useranswer}</pre>
                                </div>;
                            })}
                        </div>
                    </div>
                    </div>
                </div>
                <div className='w-6/12'></div>
            </div>
        </>
    );
}