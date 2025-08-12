import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router';
import { addToPastes, updateToPaste } from '../redux/pasteSlice';
import { Copy } from "lucide-react";
import toast from 'react-hot-toast';

const Home = () => {

  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [copied, setCopied] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);



  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId])

  function createPastes() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36), createdAt: new Date().toISOString(),
    }

    if (pasteId) {
      // update
      dispatch(updateToPaste(paste));
    }
    else {
      // create
      dispatch(addToPastes(paste));
    }

    setTitle('');
    setValue('');
    setSearchParams({});
  }

  const copyToClipboard = () => {
    if (value !== '') {
      navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
    else {
      toast.error("Your clipboard is empty! Add some text before copying.")
    }
  };

  return (
    <div> 
      <div className='flex flex-row items-center justify-between gap-4 px-72 pt-10 mb-6'>
        <input
          className='p-1 rounded-sm border-1 border-stone-400 w-[80%] pl-4 pt-2 pb-2'
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className='p-2 rounded-lg bg-blue-800 text-white hover:bg-blue-600'
          onClick={createPastes}
        >
          {
            pasteId ? "Update My Paste" : "Create My paste"
          }
        </button>
      </div>
      <div className='flex flex-col place-content-between px-72 mb-0'>

        <div className='flex justify-between rounded-xs border-1 pl-3 py-2 pr-3 border-stone-400'>
          <div>
            <button className='rounded-full w-3 h-3 bg-red-600 mr-1'></button>
            <button className='rounded-full w-3 h-3 bg-yellow-300 mr-1'></button>
            <button className='rounded-full w-3 h-3 bg-green-500'></button>
          </div>

          <Copy className="w-5 h-5 text-gray-600 hover:text-black" onClick={copyToClipboard} />
        </div>

        <textarea
          className='rounded-xs border-1 border-stone-400 min-w-full pl-4 pt-3.5'
          value={value}
          placeholder="Write your content here..."
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  )
}

export default Home