"use client"

import { ArrowUp, Loader2, SplinePointer, X, } from 'lucide-react'
import React, { useState } from 'react'
import generateAi from '../configs/AiModel';
import { db } from '../configs/db';
import { JsonForms } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { generateId } from '@/lib/generateId';
import { useRouter } from 'next/navigation';

type ChildProps = {
    setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AiInputModal = ({ setIsFormOpen }: ChildProps) => {

    const [userInput, setUserInput] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const { user } = useUser();
    const route = useRouter();

    const generateAiForm = async () => {
        if (userInput.length < 1) {
            console.log('type a valid input')
            return;
        }
        setLoading(true);
        try {
            const generatedText = await generateAi(userInput);
            const id = generateId();

            const res = await db.insert(JsonForms).values({
                id: id,
                jsonform: generatedText,
                createdBy: user?.primaryEmailAddress?.emailAddress ?? "unknown",
                createdAt: Date.now(),
            }).returning({ id: JsonForms.id });

            console.log('new form', res)
            if(res[0].id) {
                route.push(`/edit-form/${res[0].id}`)
            }
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='w-full h-full bg-black/30 flex justify-center items-center absolute top-0'>
            <div className='bg-white rounded-lg p-4 min-w-xl border relative border-zinc-400 shadow-sm'>

                <div className='flex justify-between'>
                    <h2 className='text-lg text-zinc-700 font-semibold mb-4'>Type your input to generate the form with AI</h2>
                    <X className='cursor-pointer' onClick={() => setIsFormOpen((prev: boolean) => !prev)} />
                </div>

                <div className='relative'>
                    <textarea placeholder={`Create a job application form`}
                        className='text-sm h-32 min-h-20 w-full p-2 outline-blue-600/40 text-zinc-600 rounded-md border border-zinc-500'
                        onChange={(e) => setUserInput(e.target.value)}
                    ></textarea>

                    <button
                        className='absolute bottom-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed! right-2 p-2 bg-zinc-800 text-white rounded-full'
                        onClick={generateAiForm}
                        disabled={loading}
                    >
                        {
                            loading ? <Loader2 className='animate-spin'/> : <ArrowUp />
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AiInputModal