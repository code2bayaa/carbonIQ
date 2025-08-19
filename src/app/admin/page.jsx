"use client"
import Image from 'next/image';
import { Geist, Geist_Mono } from "next/font/google";
import MapClient from '@/layers/map';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const ADMIN = () => {

    const [form, setForm] = useState({
        name: '',
        kind: 'school'
    });
    const [coord, setCoord] = useState({
        lat: 0,
        lng: 0
    });

    const [institutions, setInstitutions] = useState(null);

    useEffect(() => {
        const fetchInstitutions = async () => {
            try {
                const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/institutions/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                    setInstitutions(data);
                } else {
                    console.error('Failed to fetch institutions');
                }
            } catch (error) {
                console.error('Error fetching institutions:', error);
            }
        };

        fetchInstitutions();
    }, []);

    const setCoordinates = (coordinates) => {
        console.log("Coordinates set:", coordinates);
        setCoord(coordinates);
    }

    const submitInstitution = async (e) => {
        e.preventDefault();
        try {
            // if(!form.name || coord.lat === 0 || coord.lng === 0) {
            //     alert('Please fill in all fields and select a location on the map.');
            //     return;
            // }
            const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/institutions/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({
                    ...form,
                    location:{
                        type:"Point",
                        coordinates: [coord.lng, coord.lat] // Note: [lng, lat] order
                    }
                }),
            });
            console.log(response)

            if (response.ok) {
                alert('Institution added successfully!');
                setForm({ name: '', kind: 'school' });
                setCoord({ lat: 0, lng: 0 });
            } else {
                alert('Failed to add institution');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while adding the institution');
        }
    }
    return (
        <div className="w-[100%] h-[100%] text-[#000] flex flex-row bg-gray-100">
            <div style={{backgroundImage:"radial-gradient(circle,rgba(235, 172, 96, 1) 0%, rgba(201, 151, 107, 1) 50%, rgba(237, 206, 83, 0.92) 100%)"}} className="w-[20%] h-[100%] flex flex-col">
                <Image src={"/logo.png"} alt="Logo" width={200} height={200} className="mb-4 h-[10%] w-[100%]" />
                <h1 className="text-white text-2xl font-bold">Admin</h1>
                <Link
                    href="/admin"
                    className="text-white w-[100%] border-b-[#000] border-b-[1px] h-[60px] text-lg mt-2 hover:underline"
                >
                    add institution
                </Link>
                <Link
                    href="/admin/student"
                    className="text-white w-[100%]  border-b-[#000] border-b-[1px] h-[60px] text-lg mt-2 hover:underline"
                >
                    add student
                </Link>
                
            </div>
            
            <div className="w-[80%] h-[100%] flex flex-row">
                <div className='w-[60%] h-[100%] bg-white p-8 flex flex-col items-center justify-center'>
                    <MapClient setCoordinates={setCoordinates} sites={institutions && institutions.map(({location}) => ({lng: location.coordinates[0], lat: location.coordinates[1], img: '/school.png'}))} />
                </div>
                
                
                <div className="bg-white p-8 rounded-lg shadow-lg w-[40%]">
                    <form className="flex flex-col space-y-4">
                        <label>
                            <h1 className="text-black text-4xl font-bold mb-4">Add Institution</h1>
                        </label>
                        <input
                            type="text"
                            placeholder="Institution Name"
                            className="p-2 border border-gray-300 rounded"
                            onChange={
                                (e) => setForm({ ...form, name: e.target.value })
                            }
                        />
                        <select
                            type="text"
                            placeholder="Institution Type"
                            className="p-2 border border-gray-300 rounded"
                            onChange={
                                (e) => setForm({ ...form, kind: e.target.value })
                            }
                        >
                            <option value="school">school</option>
                            <option value="hospital">hospital</option>
                            <option value="facility">facility</option>
                        </select>
                        <button
                            type="submit"
                            onClick={(e) => submitInstitution(e) }
                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
                        >
                            ADD
                        </button>
                    </form>
                    <div className='w-[100%] h-[100%] mt-8 overflow-auto'>
                        <h2 className="text-black text-2xl font-bold mb-4">Institutions</h2>
                        {institutions && institutions.length > 0 ? (
                            <div className="w-[100%]">
                                {institutions.map((institution,index) => (
                                    <div key={index} style={{background:index%2?"#fff":"#ccc"}} className={`h-[60px] w-[100%] mb-2 text-[#000]`}>
                                        {institution.name} - {institution.kind}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No institutions found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ADMIN;