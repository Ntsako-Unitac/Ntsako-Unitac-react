import React from 'react'
import HomePage from './pages/HomePage';
import { Route , createBrowserRouter , createRoutesFromElements , RouterProvider} from 'react-router-dom' ;
import MainLayout from './Layout/MainLayout';
import JobsPage from './pages/JobsPage';
import NotFound from './pages/NotFound';
import AddJobPage from './pages/AddJobPage';
import JobPaage , {jobLoader} from './pages/JobPaage';




const App = () => {
  //add new job
  const addJob = async (newJob) =>{
    const res = await  fetch('/api/jobs',{
      method: 'POST',
      Headers: {
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify(newJob),
    });
    return;
  }

  //delete job
  const deleteJob = async (id) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: 'DELETE',
    });
    return res.json();  // Return some response or handle the result appropriately.
  };


  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path= '/' element = {<MainLayout/>}>
     <Route index element = {<HomePage/>}/>
     <Route path = '/jobs' element = {<JobsPage/>}/>
     <Route path = '/jobs/:id' element = {<JobPaage deleteJob={deleteJob}/>} loader ={jobLoader}/>
     <Route path = '/add-job' element = {<AddJobPage addJobSubmit={addJob}/>}/>
   
     <Route path = '*' element = {<NotFound/>}/>
    </Route>
  ) 
  );
  return <RouterProvider router={router}/>
};

export default App ;