// App.js
import React from 'react';
import Main from './components/Main';
import { BrowserRouter } from "react-router-dom";
import Pages from './components/Pages';
import { Link } from 'react-router-dom';


function App() {

  
  
  return (
    <div className="App">
        <BrowserRouter>
        {/* top bar */}
        <div  className='bg-orange-600 blur text-white h-16 text-center pt-3 text-2xl items-baseline fixed top-0 left-0 right-0'>

        </div>
        <div className=' text-white h-16 text-center pt-3 text-2xl items-baseline fixed top-0 left-0 right-0'>
        <img  className='inline w-9  'src="https://www.gstatic.com/mobilesdk/240501_mobilesdk/firebase_28dp.png" alt="" />

        <h1 className='inline font-bold font-sans'>Yes Gas</h1>
        </div>

{/* top bar */}
           <Pages/>
               {/* bottom menu */}
                <div className="fixed shadow-2xl shadow-orange-900  z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-orange-200 rounded-full bottom-4 left-1/2 dark:bg-orange-600 dark:border-orange-600">
                    <div className="grid h-full max-w-lg grid-cols-2 mx-auto">
                    {/* home buttun */}
                    
                    <Link to={'/'} data-tooltip-target="tooltip-home" type="button" className="inline-flex flex-col items-center rounded-s-full justify-center px-5   hover:bg-gray-50 dark:hover:bg-orange-800 group">
                        <svg className="w-5 h-5 mb-1 text-orange-500 dark:text-white group-hover:text-orange-600  dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                        </svg>
                        <span className="sr-only">Home</span>
                      </Link>
                      <div id="tooltip-home" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-orange-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-orange-700">
                        Home
                        <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                    
                    {/* home buttun */}
                    {/* search button  */}
                    
                    <Link to={'/search'} className="flex items-center justify-center hover:bg-gray-50 dark:hover:bg-orange-800 rounded-r-full">
                        <button data-tooltip-target="tooltip-new" type="button" className="inline-flex   items-center justify-center w-10 h-10 font-medium  rounded-full  group focus:ring-4 focus:ring-orange-300 focus:outline-none dark:focus:ring-orange-800">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0,0,256,256">
                            <g fill="#ffffff" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" ><g transform="scale(5.12,5.12)"><path d="M21,3c-9.39844,0 -17,7.60156 -17,17c0,9.39844 7.60156,17 17,17c3.35547,0 6.46094,-0.98437 9.09375,-2.65625l12.28125,12.28125l4.25,-4.25l-12.125,-12.09375c2.17969,-2.85937 3.5,-6.40234 3.5,-10.28125c0,-9.39844 -7.60156,-17 -17,-17zM21,7c7.19922,0 13,5.80078 13,13c0,7.19922 -5.80078,13 -13,13c-7.19922,0 -13,-5.80078 -13,-13c0,-7.19922 5.80078,-13 13,-13z"></path></g></g>
                        </svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </Link>
                    <div id="tooltip-new" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-orange-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-orange-700">
                        Search
                        <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                    {/* search button  */}

                    

                    {/* favorite button  */}
                    {/* <div className="flex items-center justify-center">
                        <button data-tooltip-target="tooltip-new" type="button" className="inline-flex items-center justify-center w-10 h-10 font-medium  rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
                        <img src={StartGif} alt="" />
                            <span className="sr-only">Search</span>
                        </button>
                    </div>
                    <div id="tooltip-new" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-orange-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-orange-700">
                        Search
                        <div className="tooltip-arrow" data-popper-arrow></div>
                    </div> */}
                    {/* favorite button  */}

                    
                </div>
            </div>

    {/* bottom menu */}

        </BrowserRouter>,

    </div>
  );
}

export default App;
