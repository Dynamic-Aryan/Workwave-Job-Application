import {SignIn} from '@clerk/nextjs'


export default function SignInPage(){
    return(
         <div className='items-center justify-center'>
            <SignIn/>
         </div>
    )
}