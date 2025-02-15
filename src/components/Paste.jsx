import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast, { Toaster } from 'react-hot-toast';

const Paste = () => {

  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const [date, setDate] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase()));

  useEffect(() => {
    const updateDate = () => {
      setDate(
        new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      );
    };

    updateDate(); // Set the initial date
    const timer = setInterval(updateDate, 1000 * 60 * 60 * 24); // Update every day

    return () => clearInterval(timer);
  }, []);

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  // function handleCopy(content){
  //   navigator.clipboard.writeText(content);
  //   toast.success("Copied to clipboard!");
  // }

  function handleShare(paste) {
    const shareableLink = `https://paste-app-umber-pi.vercel.app/pastes/${paste._id}`;
    navigator.clipboard.writeText(shareableLink);
    toast.success("Link copied to clipboard!");
  }

  return (
    <div className='px-72 mt-5'>
      <input
        className='p-2 pl-3 border-1 rounded-sm min-w-full mt-5 border-stone-400'
        type='search'
        placeholder='Search here'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className='flex pl-4 mt-7 rounded-sm border-1 border-stone-400 h-20 items-center'>
        <h1 className='text-5xl font-bold'>All Pastes</h1>
      </div>
      <div className='flex flex-col rounded-sm border-1 gap-5 px-4 py-4 pt-3 border-stone-400'>
        {
          filteredData.length > 0 &&
          filteredData.map(
            (paste) => {
              return (
                <div key={paste?._id} className='flex flex-row rounded-sm border-1 pl-2 py-2 border-stone-400 justify-between h-22'>
                  <div>
                    <div className='text-4xl font-bold w-fit'>
                      {paste.title}
                    </div>
                    <div className='text-sm w-fit mt-2'>
                      {paste.content}
                    </div>
                  </div>
                  <div className='w-fit items-start place-content-start'>
                    <button className='border-2 rounded-sm border-stone-400 mr-2'>
                      <a href={`/?pasteId=${paste?._id}`}><svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#434343"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" /></svg>
                      </a>
                    </button>
                    <button className='border-2 rounded-sm border-stone-400 mr-2'>
                      <a href={`/pastes/${paste?._id}`}><svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#434343"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" /></svg></a>
                    </button>
                    <button onClick={() => handleDelete(paste?._id)} className='border-2 rounded-sm border-stone-400 mr-2'>
                      <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#434343"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
                    </button>
                    <button onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Copied to clipboard!");
                    }} className='border-2 rounded-sm border-stone-400 mr-2'>
                      <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#434343"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" /></svg>
                    </button>
                    <button onClick={() => handleShare(paste)} className='border-2 rounded-sm border-stone-400 mr-2'>
                      <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#434343"><path d="M680-80q-50 0-85-35t-35-85q0-6 3-28L282-392q-16 15-37 23.5t-45 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q24 0 45 8.5t37 23.5l281-164q-2-7-2.5-13.5T560-760q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-24 0-45-8.5T598-672L317-508q2 7 2.5 13.5t.5 14.5q0 8-.5 14.5T317-452l281 164q16-15 37-23.5t45-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T720-200q0-17-11.5-28.5T680-240q-17 0-28.5 11.5T640-200q0 17 11.5 28.5T680-160ZM200-440q17 0 28.5-11.5T240-480q0-17-11.5-28.5T200-520q-17 0-28.5 11.5T160-480q0 17 11.5 28.5T200-440Zm480-280q17 0 28.5-11.5T720-760q0-17-11.5-28.5T680-800q-17 0-28.5 11.5T640-760q0 17 11.5 28.5T680-720Zm0 520ZM200-480Zm480-280Z" /></svg>
                    </button>
                    <div className='flex flex-row gap-2 mt-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#434343"><path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/></svg>
                    <p className='w-fit'>{date}</p>
                    </div>
                  </div>
                </div>
              )
            }
          )
        }
      </div>
    </div>
  )
}

export default Paste