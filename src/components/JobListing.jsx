import React from 'react'
import {FaMapMarker} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useEffect , useState } from 'react';

function JobListing({isHome = false }){
    
    const [showFullDescription , setShowFullDescription] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [loading , setLoading] = useState(true);

    useEffect(() =>{
    const fetchJob = async ()=>{
      const apiURL = isHome ? '/api/jobs?_limit=3' : '/api/jobs'
    try{
       const res = await fetch(apiURL);
       const data = await res.json();
       setJobs(data);
       }catch(error){
       console.log('Error feching data', error);
       }finally {
       setLoading(false);
       }
       }
       fetchJob() ;
       },[]);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          Browse Jobs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs.map((job)=>(
                <div className="bg-white rounded-xl shadow-md relative">
                <div className="p-4">
                  <div className="mb-6">
                    <div className="text-gray-600 my-2">{job.type}</div>
                    <h3 className="text-xl font-bold">{job.title}</h3>
                  </div>
    
                  <div className="mb-5">
                  {showFullDescription
                                        ? job.description
                                        : job.description.slice(0, 100) + '...'}
                  </div>
                  <button onClick= {()=>setShowFullDescription((prevState)=>!prevState)} className ="text-indigo-500 mb-5 hover: text-indigo-600">
                    {showFullDescription ? 'Less': 'More'}
                  </button>
    
                  <h3 className="text-indigo-500 mb-2">{job.salary} / Year</h3>
    
                  <div className="border border-gray-100 mb-5"></div>
    
                  <div className="flex flex-col lg:flex-row justify-between mb-4">
                    <div className="text-orange-700 mb-3">
                        <FaMapMarker className ='inline text-lg mb-1'/>
                      {job.location}
                    </div>
                    <Link
                      to={`/jobs/${job.id}`}
                      className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                    >
                     Read More
                    </Link>
                  </div>
                </div>
              </div>

            ))}
        
        </div>
      </div>
    </section>
  )
}

export default JobListing