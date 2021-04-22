import { useAuth0 } from "@auth0/auth0-react";
export default function Form({ onSubmit, text, textSet }) {
    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0()
    return (
        <form onSubmit={onSubmit} className="mt-10">
        <textarea rows="2" className="border w-full block px-2 py-1" value={text} onChange={(e) =>textSet(e.target.value)} />
        <div className="">
        {isAuthenticated ? 
            (
            <div>
             <div className=" flex items-center space-x-2">
               <button className="btn1">Gönder</button>
                <img src={user.picture} width={30} className="rounded-full" />
                <span>{user.name}</span>
                <button typeof="button" className="btn1" onClick={() => logout({returnTo: process.env.NEXT_PUBLIC_URL + '/blog'})}>Çıkış Yap</button> 
              </div>
            </div>
            )
            :
            (<button typeof="button" className="btn1" onClick={() => loginWithRedirect()}>Giriş Yap</button> )}
        </div>
       </form>
    )
}