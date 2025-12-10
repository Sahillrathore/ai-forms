"use client"
import { db } from '@/configs/db'
import { JsonForms } from '@/configs/schema'
import React, { useEffect } from 'react'

const EditForm = () => {

    const getFormData = async () => {
        const data = await db.select().from(JsonForms)
        console.log(JSON.parse(data[0]?.jsonform))
    }

    useEffect(()=>{
        getFormData();
    },[])
    
  return (
    <div>EditForm</div>
  )
}

export default EditForm