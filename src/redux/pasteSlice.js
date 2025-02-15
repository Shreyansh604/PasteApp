import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

// const initialState = {
//   pastes: (() => {
//     const pastesData = localStorage.getItem("pastes");
//     if (pastesData) {
//       try {
//         const parsedData = JSON.parse(pastesData);
//         // Ensure the parsed data is an array
//         return Array.isArray(parsedData) ? parsedData : [];
//       } catch (error) {
//         console.error("Error parsing pastes from localStorage:", error);
//         return []; // Fallback to an empty array if parsing fails
//       }
//     }
//     return []; // Fallback to an empty array if no data exists
//   })()
// };

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : []
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      
      // Check if the paste is empty
      if (!paste.content || paste.content.trim() === "") {
        toast.error("Cannot create an empty paste!");
        return;
      }

      // add a check -> paste already exist case
      const isDuplicate = state.pastes.some((item) => item.content === paste.content);
      if (isDuplicate) {
        toast.error("Paste already exists!");
        return;
      }

      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste Created Successfully")
    },
    updateToPaste: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id)

      if (!paste.content || paste.content.trim() === "") {
        toast.error("Cannot create an empty paste!");
        return;
      }

      // // add a check -> paste already exist case
      // const isDuplicate = state.pastes.some((item) => item._id === paste._id);
      // if (isDuplicate) {
      //   toast.error("Paste already exists!");
      //   return;
      // }


      if (index >= 0) {
        state.pastes[index] = paste
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste Updated")
      }
    },
    resetAllPastes: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload;

      console.log(pasteId);
      const index = state.pastes.findIndex((item) => item._id === pasteId);

      if(index >= 0){
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        toast.success("Paste deleted")
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPaste, resetAllPastes, removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer