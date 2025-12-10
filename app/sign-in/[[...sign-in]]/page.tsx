import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='flex justify-center items-center bg-amber-50 min-h-screen'>
        <SignIn />
    </div>
  )
}