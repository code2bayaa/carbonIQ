"use client"
import Image from 'next/image';
import MapClient from '@/layers/map';
import Link from 'next/link';
import { useEffect, useState, useRef } from "react";

const STUDENT = () => {
    // const [student, setStudent] = useState({
    //     name: '',
    //     email: '',
    // })
    const [coord, setCoord] = useState({
        lat: 0,
        lng: 0
    });
    const [form, setForm] = useState({
        nearest_institution_id: '',
        measure_height_cm: '',
        measure_width_cm: '',
        waste_type: 'organic',
        feedback: '',
        safe: false,
        urban_area: false,
        children_present: false,
        flood_risk: false,
        animals_present: false,
        collection_method: 'curbside',
        image_url: null
    })
    const [previewImage, setImage] = useState(null)
    const uploadFile = useRef(null)
    const [uploading, setUpload] = useState(false)

    const handleChange = (n) => {
        const file = uploadFile?.current.files[0];
        console.log(file)
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file); // Convert to Base64 for preview
            reader.onload = () => setImage(reader.result);
            setForm((prevForm) => ({ ...prevForm, image_url: file }))
        }
        setUpload(false)
    }
    const setCoordinates = (coordinates) => {
        console.log("Coordinates set:", coordinates);
        setCoord(coordinates);
    }

    const submitReport = async (e) => {
        e.preventDefault();
        if (!form.nearest_institution_id || !form.measure_height_cm || !form.measure_width_cm || !form.waste_type || !form.feedback) {
            alert('Please fill in all fields.');
            return;
        }
        if (coord.lat === 0 || coord.lng === 0) {
            alert('Please select a location on the map.');
            return;
        }
        if (!form.image_url) {
            alert('Please upload an image.');
            return;
        }

        const formData = new FormData();
        formData.append('file', form.image_url);

        try {
            const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/reports/upload', {
                method: 'POST',
                headers: {
                    "Authorization": 'Bearer ' + localStorage.getItem('token')
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                if(data && data.filename) {
                    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/reports', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": 'Bearer ' + localStorage.getItem('token')
                        },
                        body: JSON.stringify({
                            ...form,
                            "location": {
                                "type": "Point",
                                "coordinates": [
                                    coord.lng,
                                    coord.lat
                                ]
                                
                            },
                            image_url: data.filename, // Use the filename from the upload response
                        }),
                    });
                    if(response.ok) {
                        const data = await response.json();

                        console.log('Report submitted successfully:', data);
                        alert('Report submitted successfully!');
                        setForm({});
                        setImage(null);
                        setCoord({ lat: 0, lng: 0 });
                    }
                }
            } else {
                const errorData = await response.json();
                console.error('Error submitting report:', errorData);
                alert('Failed to submit report: ' + errorData.message);
            }
        } catch (error) {
            console.error('Error submitting report:', error);
            alert('An error occurred while submitting the report.');
        }
    }
    const saveImg = () => {
        uploadFile.current.click();
        setUpload(true)
    }
    return (
        <div className="w-[100%] h-[100%] text-[#000] flex flex-row bg-[linear-gradient(#fdfcfb,#e2d1c3,#e2d1c3)]">
            <div className="w-[20%] bg-[linear-gradient(#181C14,#0C0C0C)] border-r-[2px] border-[#fff] text-[#4E6688] h-[100%] flex flex-col">
                <Image src={"/logo.png"} alt="Logo" width={200} height={200} className="mb-4 h-[10%] w-[100%]" />
                <h1 className="text-white text-2xl font-bold">Student</h1>
                <Link
                    href="/student"
                    className="backdrop-blur-md border-[#fff] border-b-[2px] rounded-[2px] ml-[1%] w-[98%] h-[40px] text-lg mt-4 hover:underline"
                >
                    add report
                </Link>
                <Link
                    href="/student/reports"
                    className="w-[98%] ml-[1%] border-[#fff] border-b-[2px] backdrop-blur-md rounded-[2px]  h-[40px] text-lg mt-2 hover:underline"
                >
                    collected reports
                </Link>
                <Link
                    href="/student/rewards"
                    className="w-[98%] ml-[1%] border-[#fff] border-b-[2px] backdrop-blur-md rounded-[2px]  h-[40px] text-lg mt-2 hover:underline"
                >
                    rewards
                </Link>                
            </div>
            <div className="w-[80%] h-[100%] flex flex-row">
                <div className='w-[60%] h-[100%] bg-white p-8 flex flex-col items-center justify-center'>
                    <MapClient setCoordinates={setCoordinates} />
                </div>
                
                
                <div className="bg-white p-8 rounded-lg shadow-lg w-[40%] overflow-auto h-[100%]">
                    <form className="flex flex-col space-y-4">
                        <label>
                            <h1 className="text-black text-4xl font-bold mb-4">Add Report</h1>
                        </label>
                        <div className='w-[100%] flex flex-row justify-between'>
                            {
                                previewImage && <Image
                                    alt="waste site image"
                                    height={200}
                                    src={previewImage}
                                    width={200} 
                                />  
                            }
                            <input type="file" ref={uploadFile} hidden onChange={() => handleChange()}/>
                            <button
                                onClick={() => saveImg()}
                                type="button"
                                disabled={uploading}
                                style={{height:"40px",width:"80%",marginLeft:"10%",background:"#000",color:"#fff"}}
                            >
                                {uploading ? "uploading..." : "INSERT IMAGE" }
                            </button>
                        </div>
                        <input
                            type="text"
                            placeholder="near by institution"
                            className="p-2 border border-gray-300 rounded"
                            onChange={
                                (e) => setForm({ ...form, nearest_institution_id: e.target.value })
                            }
                        />
                        <div className='w-[100%] flex flex-row justify-between'>
                            <input
                                type="text"
                                placeholder="height of waste site"
                                className="p-2 border border-gray-300 rounded w-[48%]"
                                onChange={
                                    (e) => setForm({ ...form, measure_height_cm: e.target.value })
                                }
                            />
                            <input
                                type="text"
                                placeholder="width of waste site"
                                className="p-2 border border-gray-300 rounded w-[48%]"
                                onChange={
                                    (e) => setForm({ ...form, measure_width_cm: e.target.value })
                                }
                            />
                        </div>
                        <select
                            type="text"
                            placeholder="waste type"
                            className="p-2 border border-gray-300 rounded"
                            onChange={
                                (e) => setForm({ ...form, waste_type: e.target.value })
                            }
                        >
                            <option value="organic">organic</option>
                            <option value="recyclable_plastic">recyclable plastic</option>
                            <option value="recyclable_paper">recyclable paper</option>
                            <option value="recyclable_glass">recyclable glass</option>
                            <option value="e_waste">e-waste</option>
                            <option value="waste_collection">waste collection</option>
                            <option value="mixed">mixed</option>
                        </select>
                        <textarea
                            placeholder="describe the waste site"
                            className="p-2 border border-gray-300 rounded"
                            onChange={
                                (e) => setForm({ ...form, feedback: e.target.value })
                            }
                        ></textarea>
                        <div className='w-[100%]'>
                            <p className='text-[#ffd800]'>(leave blank if not true)</p>
                            <p>is it safe?</p>
                            <input
                                type="checkbox"
                                name="is_safe"
                                onChange={
                                    (e) => setForm({ ...form, safe: !form.safe })
                                }
                                className="mr-2"
                            />
                            <p>located in an urban area?</p>
                            <input
                                type="checkbox"
                                name="is_urban"
                                onChange={
                                    (e) => setForm({ ...form, urban_area: !form.urban_area })
                                }
                                className="mr-2"
                            />
                            <p>are there children present?</p>
                            <input
                                type="checkbox"
                                name="is_children_present"
                                onChange={
                                    (e) => setForm({ ...form, children_present: !form.children_present })
                                }
                                className="mr-2"    
                            />
                            <p>indication of flood?</p>
                            <input
                                type="checkbox"
                                name="is_flood"
                                onChange={
                                    (e) => setForm({ ...form, flood_risk: !form.flood_risk })
                                }
                                className="mr-2"
                            />
                            <p>are there wild animals indications?</p>
                            <input
                                type="checkbox"
                                name="is_wild_animals"
                                onChange={
                                    (e) => setForm({ ...form, animals_present: !form.animals_present })
                                }
                                className="mr-2"
                            />
                        </div>
                        <p>collection method used in waste site</p>
                        <select 
                            type="text"
                            placeholder="collection method used in waste site"
                            className="p-2 border border-gray-300 rounded"
                            onChange={
                                (e) => setForm({ ...form, collection_method: e.target.value })
                            }
                        >
                            <option value="curbside">curbside</option>
                            <option value="door_to_door">door to door</option>
                            <option value="drop_off">drop off</option>
                            <option value="pickup_services">pickup services</option>
                            <option value="return_system">return system</option>
                        </select>
                        <button
                            type="submit"
                            onClick={(e) => submitReport(e) }
                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
                        >
                            ADD
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default STUDENT;