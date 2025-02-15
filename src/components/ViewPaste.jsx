import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { Copy } from "lucide-react";
import toast from 'react-hot-toast';

const ViewPaste = () => {

  const { id } = useParams();
  const [value, setValue] = useState('');
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.filter((p) => p._id === id)[0];

  const copyToClipboard = () => {
    if (!paste?.content.trim()) {
      toast.error("Your clipboard is empty! Add some text before copying.");
      return;
    }

    navigator.clipboard.writeText(paste.content);
    toast.success("Copied to clipboard!");
  };

  return (
    <div>
      <div className='flex flex-row items-center justify-between gap-4 px-72 mt-10 mb-6'>
        <input
          className='p-1 rounded-sm border-1 border-stone-400 w-full pl-4 pt-2 pb-2'
          type="text"
          placeholder="Enter title here"
          value={paste.title}
          disabled
          onChange={(e) => setTitle(e.target.value)}
        />
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
          value={paste.content}
          placeholder="Enter content here"
          disabled
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  )
}

export default ViewPaste
