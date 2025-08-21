'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ChartRadialGrid } from "@/layers/radial";
import { ChartRadarGridCircleFill } from "@/layers/radar";

export default function ReportDetailPage() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchReport() {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_URL + `/reports/${id}`,
          {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
          }
        );
        if (!res.ok) throw new Error('Failed to fetch report');
        const data = await res.json();
        setReport(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchReport();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!report) return <div>No report found.</div>;

  return (
    <div className="p-8 flex items-center h-[100%] w-[100%]">
        <div className="w-[40%]">
            <h1 className="text-2xl">{report?.waste_type.toUpperCase().replace("_"," ")}</h1>
            <p>Geo Points</p>
            <div className="w-[100%] flex flex-row">
                <div className="w-[50%]">
                    <h2>Longitude</h2>
                    <p>{report?.location.coordinates[0]}</p>
                </div>
                <div className="w-[50%]">
                    <h2>Latitude</h2>
                    <p>{report?.location.coordinates[1]}</p>
                </div>

            </div>
        </div>
      <div className="w-[60%] m-[1%]">
        <ChartRadarGridCircleFill classes={`bg-[#181C14] m-[1%] text-white`}/>
      </div>
      
    </div>
  )
}