"use client"
import { ChartAreaInteractive } from '@/layers/area';
import { ChartPieLabel } from '@/layers/pie';
import { ChartRadialGrid } from '@/layers/radial';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const REPORTS = () => {

    const [reports, setReports] = useState(null)
    const [chartConfig, setChartConfig] = useState(null)
    const [chartData, setChartData] = useState(null)
    const [collectionChartConfig, setCollectionChartConfig] = useState(null)
    const [collectionChartData, setCollectionChartData] = useState(null)

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

    useEffect(() => {
        console.log(reports)
        setChartConfig({
            organic: {
                label: "organic",
                color: "var(--chart-6)"
            },
            recyclable_plastic: {
                label: "recyclable plastic",
                color: "var(--chart-1)",
            },
            recyclable_paper: {
                label: "recyclable paper",
                color: "var(--chart-2)",
            },
            recyclable_glass: {
                label: "recyclable glass",
                color: "var(--chart-3)",
            },
            e_waste: {
                label: "e waste",
                color: "var(--chart-4)",
            },
            mixed: {
                label: "mixed",
                color: "var(--chart-5)",
            },
        }) 
        setChartData([
            { waste: "recyclable_plastic", sites: 275, fill: "var(--chart-6)" },
            { waste: "organic", sites: 200, fill: "var(--chart-1)" },
            { waste: "recyclable_paper", sites: 187, fill: "var(--chart-2)" },
            { waste: "recyclable_glass", sites: 173, fill: "var(--chart-3)" },
            { waste: "e_waste", sites: 90, fill: "var(--chart-4)" },
            { waste: "mixed", sites: 90, fill: "var(--chart-5)" },
        ]);
        setCollectionChartConfig({
            curbside: {
                label: "curbside",
                color: "var(--chart-6)"
            },
            door_to_door: {
                label: "door to door",
                color: "var(--chart-1)",
            },
            drop_off: {
                label: "drop off",
                color: "var(--chart-2)",
            },
            pickup_services: {
                label: "pickup services glass",
                color: "var(--chart-3)",
            },
            return_system: {
                label: "return system",
                color: "var(--chart-4)",
            }
        }) 
        setCollectionChartData([
            { collection: "curbside", sites: 275, fill: "var(--chart-6)" },
            { collection: "door_to_door", sites: 200, fill: "var(--chart-1)" },
            { collection: "drop_off", sites: 187, fill: "var(--chart-2)" },
            { collection: "pickup_services", sites: 173, fill: "var(--chart-3)" },
            { collection: "return_system", sites: 90, fill: "var(--chart-4)" },
        ]);
    },[reports])

    return (
        <div className="w-[100%] h-[100%] text-[#fff] flex flex-row bg-[#000]">
            <div className="w-[20%] bg-[linear-gradient(#181C14,#0C0C0C)] border-r-[2px] border-[#fff] text-[#4E6688] h-[100%] flex flex-col">
                <Image src={"/logo.png"} alt="Logo" width={200} height={200} className="mb-4 h-[10%] w-[100%]" />
                <h1 className="text-white text-2xl font-bold">Admin</h1>
                <Link
                    href="/admin"
                    className="border-[#fff] border-b-[2px] backdrop-blur-md rounded-[2px] ml-[1%] w-[98%] h-[40px] text-lg mt-4 hover:underline"
                >
                    add institution
                </Link>
                <Link
                    href="/admin/student"
                    className="border-[#fff] border-b-[2px] w-[98%] ml-[1%] backdrop-blur-md rounded-[2px]  h-[40px] text-lg mt-2 hover:underline"
                >
                    add student
                </Link>
                <Link
                    href="/admin/reports"
                    className="border-[#fff] border-b-[2px] w-[98%] ml-[1%] backdrop-blur-md rounded-[2px]  h-[40px] text-lg mt-2 hover:underline"
                >
                    view reports
                </Link>
            </div>
            
            <div className="w-[80%] overflow-auto h-[100%] flex flex-col">
                <div className='w-[100%] flex flex-row flex-wrap'>
                    <div className='w-[100%]'>
                        <ChartAreaInteractive classes={"bg-[#181C14] m-[1%] text-white"}/>
                    </div>
                    <div className='w-[40%] '>
                        {
                            chartConfig && chartData && <ChartPieLabel chartData={chartData} description={"Waste Composition"} chartConfig={chartConfig} classes={"bg-[#181C14] m-[1%] text-white"} />
                        }
                    </div>
                    <div className='w-[40%] '>
                        {
                            collectionChartConfig && collectionChartData && <ChartRadialGrid chartData={collectionChartData} description={"Collection Types"} chartConfig={collectionChartConfig} classes={"bg-[#181C14] m-[1%] text-white"} />
                        }
                    </div>
                </div>
                
                <div className="w-[100%] h-[auto] flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold mb-4">Reports</h1>
                    {reports ? (
                        reports.map((report, index) => (
                            <div key={index} style={{background:index%2?"white":"#393E46"}} className={`p-4 mb-4 w-[80%] border-[2px] border-[#fff] rounded-lg flex flex-row flex-wrap`}>
                                <div className='w-[23%] m-[1%]'>
                                    <h2 className="text-xl font-semibold">{report.waste_type}</h2>
                                </div>
                                <div className='w-[23%] m-[1%]'>
                                    <Link
                                     href={"/admin/reports/" + report["_id"]}
                                     className='w-[98%] text-black h-[40px] text-center block m-[1%] border-[#000] border-[2px]'
                                    >
                                        view stats
                                    </Link>
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
    );
}

export default REPORTS;