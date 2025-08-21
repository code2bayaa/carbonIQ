"use client"
import Image from 'next/image';
// import MapClient from '@/layers/map';
import Link from 'next/link';
import { useEffect, useState } from "react";

const REPORTS = () => {

    const [reports, setReports] = useState(null)

    useEffect(() => {
        function fetchReports(){
            try{

                const response = fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/reports/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",

                    },
                })
                .then(res => res.json())
                .then(data => {
                    if(data){
                        setReports(data)
                    }else{
                        console.log("error fetching reports")
                    }
                })
            }catch(error){
                console.log(error)
            }
        }
        fetchReports()
    },[])

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
            <div className="w-[80%] h-[100%] overflow-auto">
                <div className="w-[100%] h-[auto] flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold mb-4">Reports</h1>
                    {reports ? (
                        reports.map((report, index) => (
                            <div key={index} className={`bg-${index%2?"white":"amber"} p-4 mb-4 w-[80%] shadow-md rounded-lg flex flex-row flex-wrap`}>
                                <div className='w-[23%] m-[1%]'>
                                    <h2 className="text-xl font-semibold">{report.waste_type}</h2>
                                </div>
                                <div className='w-[23%] m-[1%]'>
                                    <p>{report.feedback}</p>
                                </div>
                                <div className='w-[23%] m-[1%]'>
                                    <p className="text-gray-500">Status: {report.status}</p>
                                </div>
                                <div className='w-[23%] m-[1%]'>
                                    <p className="text-gray-500">Priority: {report.priority}</p>
                                </div>
                                <div className='w-[23%] m-[1%]'>
                                    <p className="text-gray-500">Collection Method: {report.collection_method}</p>
                                </div>
                                <div className='w-[23%] m-[1%]'>
                                    {
                                        report.image_url ? (
                                            <Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/static/images/${report.image_url}`} alt="Report Image" width={100} height={100} className="rounded-lg" />
                                        ) : (
                                            <p>No image available</p>
                                        )
                                    }
                                </div>
                                <div className='w-[23%] m-[1%]'>
                                    {
                                        report.safe ? (
                                            <p className="text-green-500">Safe</p>  
                                        ) : (
                                            <p className="text-red-500">Not Safe</p>
                                        )
                                    }
                                </div>
                                <div className='w-[23%] m-[1%]'>
                                    {
                                        report.urban_area ? (
                                            <p className="text-blue-500">Urban Area</p>
                                        ) : (
                                            <p className="text-gray-500">Rural Area</p>
                                        )
                                    }
                                </div>
                                <div className='w-[23%] m-[1%]'>
                                    {
                                        report.children_present ? (
                                            <p className="text-green-500">Children Present</p>
                                        ) : (
                                            <p className="text-gray-500">No Children Present</p>
                                        )
                                    }
                                </div>
                                <div className='w-[23%] m-[1%]'>
                                    {
                                        report.flood_risk ? (
                                            <p className="text-red-500">Flood Risk</p>
                                        ) : (
                                            <p className="text-gray-500">No Flood Risk</p>
                                        )
                                    }
                                </div>
                                <div className='w-[23%] m-[1%]'>
                                    {
                                        report.animals_present ? (
                                            <p className="text-red-500">Animals Present</p>
                                        ) : (
                                            <p className="text-gray-500">No Animals Present</p>
                                        )
                                    }
                                </div>
                                <div className='w-[23%] m-[1%]'>
                                    <p className="text-gray-500">Created at: {new Date(report.timestamp).toLocaleDateString()}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Loading reports...</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default REPORTS;