import { useContext, useEffect, useState } from "react"
import { UserContext } from "../UserContext";
import { BASE_URL } from "../helper";

export default function Placesform({onChange}){
    const [title,settitle]=useState('');
    const [address,setaddress]=useState('');
    const [photos,setPhotos]=useState([]);
    const [desc,setdesc]=useState('');
    const [checkin,setcheckin]=useState('');
    const [checkout,setcheckout]=useState('');
    const [maxguest,setmaxguest]=useState('');
    const [price,setprice]=useState('');
    const {User}=useContext(UserContext);
    async function submit(ev){
       ev.preventDefault();
        const resp = await fetch(`${BASE_URL}/place`, {
            method: 'POST',
            body: JSON.stringify({User, title,address,photos,
                desc,checkin,checkout,
                maxguest,price }),
            headers: { 'Content-Type': 'application/json' }
        });
        if(!resp.ok){
            alert('wrong input');
        }
        else{
            alert('Place added')
          
        }
   

    }

    async function uploadPhoto(ev) {
      const files = ev.target.files;
      console.log('Files:', files); //
      
      const data = new FormData();
      for (let i = 0; i < files.length; i++) {
        data.append('photos', files[i]);
      }
    
      // Log the FormData entries to verify files are appended
      for (let pair of data.entries()) {
        console.log(pair[0] + ', ' + pair[1].name); // Logging the name of the files
      }
      try {
        let response = await fetch(`${BASE_URL}/upload`, {
          method: 'POST',
          body: data,
           headers: { 'Content-Type': 'application/json' }//dont include headers for formData
        });
    
        let jsonData = await response.json();
        console.log('Server response:', jsonData);
    
        if (response.status !== 422) {
          setPhotos(jsonData);
        }
      } catch (error) {
        alert('Wrong input format');
        console.error('Error uploading photos:', error);
      }
    }
    
    // async function uploadPhoto(ev) {
    //   const files = ev.target.files;
    //   console.log('Files:', files);
      
    //   const data = new FormData();
    //   let totalSize = 0;
    //   const MAX_SIZE = 10 * 1024 * 1024; // 10MB, adjust as needed
    
    //   for (let i = 0; i < files.length; i++) {
    //     totalSize += files[i].size;
    //     if (totalSize > MAX_SIZE) {
    //       alert('Total file size exceeds the limit (10MB). Please select smaller files.');
    //       return;
    //     }
    //     data.append('photos', files[i]);
    //   }
    
    //   // Log the FormData entries to verify files are appended
    //   for (let pair of data.entries()) {
    //     console.log(pair[0] + ', ' + pair[1].name);
    //   }
    
    //   try {
    //     let response = await fetch(`${BASE_URL}/upload`, {
    //       method: 'POST',
    //       body: data,
    //       // Remove the Content-Type header
    //     });
    
    //     let jsonData = await response.json();
    //     console.log('Server response:', jsonData);
    
    //     if (response.ok) {
    //       setPhotos(jsonData);
    //     } else {
    //       throw new Error(`HTTP error! status: ${response.status}`);
    //     }
    //   } catch (error) {
    //     alert('Error uploading photos: ' + error.message);
    //     console.error('Error uploading photos:', error);
    //   }
    // } 
    // async function uploadPhoto(ev) {
    //   const files = ev.target.files;
    //   console.log('Files:', files);
    
    //   const data = new FormData();
    //   let totalSize = 0;
    //   const MAX_SIZE = 10 * 1024 * 1024; // 10MB limit
    
    //   for (let i = 0; i < files.length; i++) {
    //     totalSize += files[i].size;
    //     if (totalSize > MAX_SIZE) {
    //       alert('Total file size exceeds the limit (10MB). Please select smaller files.');
    //       return;
    //     }
    //     data.append('photos', files[i]);
    //   }
    
    //   // Log the FormData entries to verify files are appended
    //   for (let pair of data.entries()) {
    //     console.log(pair[0] + ', ' + pair[1].name);
    //   }
    
    //   try {
    //     const response = await fetch(`${BASE_URL}/upload`, {
    //       method: 'POST',
    //       body: data, // FormData will automatically set the correct headers
    //     });
    
    //     const jsonData = await response.json();
    //     console.log('Server response:', jsonData);
    
    //     if (response.ok) {
    //       setPhotos(jsonData); // Assuming setPhotos is a function that updates the state with the uploaded photos
    //     } else {
    //       throw new Error(`HTTP error! status: ${response.status}`);
    //     }
    //   } catch (error) {
    //     alert('Error uploading photos: ' + error.message);
    //     console.error('Error uploading photos:', error);
    //   }
    // }
    
    return (
        
      <div className="flex justify-center">
      <form onSubmit={submit} className="w-full max-w-lg">
        <label>
          Title: short and catchy
          <input
            className="w-full rounded-lg p-2 mt-1"
            placeholder="Title"
            type="text"
            name="title"
            value={title}
            required
            onChange={(e) => settitle(e.target.value)}
          />
        </label>
        <label>
          Address of the place
          <input
            className="w-full rounded-lg p-2 mt-1"
            placeholder="Address"
            type="text"
            name="address"
            value={address}
            required
            onChange={(e) => setaddress(e.target.value)}
          />
        </label>
        <label>
          Photos
          <input
            className="w-full mt-1"
            type="file"
            name="photos"
            multiple
            onChange={uploadPhoto}
            required
            accept=".png, .jpg, .jpeg,.webp"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
            {photos.length > 0 &&
              photos.map((link) => (
                <div key={link}>
                  <img
                    src={link}
                    alt="Uploaded"
                    className="object-contain w-full h-40 sm:h-40 md:h-40 lg:h-40"
                  />
                </div>
              ))}
          </div>
        </label>
        <label>
          Description
          <textarea
            className="w-full rounded-lg p-2 mt-1"
            placeholder="Add description here"
            name="desc"
            value={desc}
            required
            onChange={(e) => setdesc(e.target.value)}
          ></textarea>
        </label>
        <div className="flex justify-evenly p-2 gap-1">
          <input
            className="w-1/2 rounded-lg p-2 mt-1"
            placeholder="Check-in date"
            type="date"
            name="checkin"
            value={checkin}
            required
            onChange={(e) => setcheckin(e.target.value)}
          />
          <input
            className="w-1/2 rounded-lg p-2 mt-1"
            placeholder="Check-out date"
            type="date"
            name="checkout"
            value={checkout}
            required
            onChange={(e) => setcheckout(e.target.value)}
          />
        </div>
        <div className="flex justify-evenly p-2 gap-1">
          <input
            className="w-1/2 rounded-lg p-2 mt-1"
            placeholder="Maximum guests"
            type="number"
            name="maxguest"
            value={maxguest}
            min="1" // Ensure minimum value is 0
            required
            onChange={(e) => setmaxguest(e.target.value)}
          />
          <input
            className="w-1/2 rounded-lg p-2 mt-1"
            placeholder="Price"
            type="number"
            name="price"
            value={price}
            min="0" // Ensure minimum value is 0
            required
            onChange={(e) => setprice(e.target.value)}
          />
        </div>
        <div className="flex justify-center gap-6 mt-4">
          <button className="bg-pink-600 text-white rounded-lg p-2 text-center font-bold">
            Submit
          </button>
        </div>
      </form>
    </div>
    
    )
}





