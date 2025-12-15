"use client"

import React, { useEffect, useState } from 'react'
import DashboardLayout from './DashboardLayout'
import { Plus } from 'lucide-react'
import AiInputModal from '@/components/AiInputModal';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import CardsShimmer from '@/components/CardsShimmer';
import Image from 'next/image';

const Dashboard = () => {

  const { user, isLoaded } = useUser();
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [forms, setForms] = useState();
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const handleOpenform = () => {
    setIsFormOpen((prev) => !prev)
  }

  useEffect(() => {
    const fetchUserForms = async () => {
      if (!isLoaded) return;
      try {

        setLoading(true);

        if (!user?.id) {
          return console.log("Please login first");
        }

        const data = await axios.get('/api/forms');
        setForms(data?.data?.forms || []);
        console.log(data?.data?.forms);

      } catch (error) {
        console.log("Forms fetching error", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUserForms();
  }, [isLoaded, user])

  // if (!isLoaded || loading) return <div>Loading...</div>

  return (
    <DashboardLayout>
      <div className='w-full p-4'>
        <div className='flex justify-between items-center w-full'>
          <h1 className='text-zinc-800 font-semibold text-2xl'>My Forms</h1>

          <button
            className='flex gap-1 px-4 py-2 bg-blue-500 text-white rounded-md font-semibold'
            onClick={handleOpenform}
          >
            <Plus />
            Create New
          </button>
        </div>

        <div>
          {/* <h2 className='text-zinc-600 text-lg font-normal'>Recent Foms</h2> */}

          {
            loading ?

              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-6 '>
                {
                  [0, 1, 2, 3].map((item) => (
                    <CardsShimmer key={item} />
                  ))
                }
              </div>
              :
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-6 w-full'>
                {
                  !forms?.length <= 0 &&
                  forms.map((form) => (
                    <div key={form.id} className='p-4 rounded-lg border border-zinc-200 min-h-36 cursor-pointer hover:-translate-y-1 transition-transform duration-500' onClick={() => router.push(`/edit-form/${form?.id}`)}>
                      <h2 className='font-semibold text-lg to-zinc-700'>{form?.jsonForm?.formTitle}</h2>
                      <h3 className='font-normal text-base text-zinc-600 leading-[1.1] mt-1.5'>{form?.jsonForm?.formSubheading?.slice(0, 100)}</h3>
                    </div>
                  ))
                }
              </div>
          }

          {
            forms?.length <= 0 &&
            <div className='w-full flex justify-center mt-32 items-center flex-col'>
              <Image src='/magician.png' alt='image..' width={400} height={200} />
              <p className='text-zinc-600 text-sm mt-3'>Looks like you haven't created any forms yet</p>
              <button className='px-6 py-1.5 border border-blue-400 text-blue-400 rounded-md hover:bg-blue-400 transition-colors hover:text-white mt-4' onClick={()=>setIsFormOpen(true)}>Create Now</button>
            </div>
          }

        </div>
      </div>

      {isFormOpen && <AiInputModal setIsFormOpen={setIsFormOpen} />}

    </DashboardLayout>
  )
}

export default Dashboard