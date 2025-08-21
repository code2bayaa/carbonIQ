'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Gift, // For rewards
  Star, // For points/achievements
  Trophy, // Another option for rewards/achievements
  Coins, // For a credit score/currency feel
} from 'lucide-react';

const RewardsPage = () => {
  const [rewards, setRewards] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchRewards() {
      try {
        // Replace with your actual API endpoint
        const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/rewards/profile', {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
        });
        if (!res.ok) throw new Error('Failed to fetch rewards');
        const data = await res.json();
        console.log(data)
        setRewards(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchRewards();
  }, []);

  if (loading) return <div>Loading rewards...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

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
        <div className="w-[80%] h-[100%] overflow-auto flex flex-col items-center">
            {rewards ? (
                <>
                <div className='w-[70%] flex flex-row flex-wrap border-[grayscale-100] border-2 rounded-[3px]'>
                    <div className='w-[40%]'>
                        {
                            rewards.full_name
                        }
                    </div>
                    <div className='w-[30%]'>
                        <Star style={{fontSize:"20%"}} className="inline-block text-[#ffd800] mr-1 h-4 w-4" />
                        {
                            rewards.level
                        }
                    </div>
                    <div className='w-[30%]'>
                        <p>points</p>
                        {
                            rewards.stats?.total_points
                        }
                    </div>
                    <div className='w-[30%]'>
                        <p>reports</p>
                        {
                            rewards.stats?.total_reports
                        }
                    </div>
                    <div className='w-[30%]'>
                        <Trophy className="inline-block text-[70%] text-[#ffd800] mr-1 h-4 w-4" />
                        {
                            rewards.stats?.current_streak
                        }
                    </div>
                </div>
                <div className='w-[70%] m-[1%] flex-wrap border-[grayscale-100] border-2 rounded-[3px]'>
                    <Gift className="inline-block text-[70%] text-[#ffd800] mr-1 h-4 w-4" />
                    <p>awards</p>
                    
                        {
                            rewards.recent_rewards.map((rewards,index) => (
                                <div className={`${index%2?"bg-[#ccc]":""} w-[100%] flex flex-row`}>
                                    <div className='w-[30%]'>
                                        <p>{rewards.action_type}</p>
                                    </div>
                                    <div className='w-[30%]'>
                                        <p>{rewards.badge_type}</p>
                                    </div>
                                    <div className='w-[30%]'>
                                        <p>{rewards.description}</p>
                                    </div>
                                    <div className='w-[30%]'>
                                        <p>{rewards.points}</p>
                                    </div>
                                    <div className='w-[30%]'>
                                        <p>{rewards.reward_type}</p>
                                    </div>
                                </div>
                            ))
                        }
                    
                </div>
                <div className='w-[70%] m-[1%] flex-wrap border-[grayscale-100] border-2 rounded-[3px]'>
                    <Gift className="inline-block text-[70%] text-[#ffd800] mr-1 h-4 w-4" />
                    <p>badges</p>
                    <div className='w-[100%] flex flex-row'>
                        {
                            rewards.stats?.badges_earned.map(badges => (
                                <div className='w-[30%]'>
                                    <p>{badges}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                </>
            ) : (
                <p>No rewards earned yet. Keep submitting reports!</p>
            )}
        </div>
    </div>
  );
};

export default RewardsPage;