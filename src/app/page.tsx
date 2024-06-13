'use client'
import { Loading } from "@/components/Loading";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, User, getRedirectResult, signInWithPopup, signInWithRedirect } from "firebase/auth";
import {  useSearchParams, useRouter } from "next/navigation";
import {  useEffect, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    async function handleRedirectResult() {
      setIsLoading(true)

      const isLogged = localStorage.getItem('@fictional:logged')
      if(isLogged) return

      try {
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)
        
        if (result?.user) {
          const userOfSocialLogin = result.user
          setUser(userOfSocialLogin)

          const authId = userOfSocialLogin.uid
          const email = userOfSocialLogin.email ?? ''
          const name = userOfSocialLogin.displayName ?? ''
          const photoUrl = userOfSocialLogin.photoURL
          const verified = userOfSocialLogin.emailVerified
          const refreshToken = userOfSocialLogin.refreshToken

          localStorage.setItem('@fictional:logged', 'true')

          const deepLink = `fictional://auth/success?authId=${authId}&email=${email}&name=${name}&photoUrl=${photoUrl}&verified=${verified}&token=${refreshToken}`

          window.location.href = deepLink
        }

        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
      }
    }

    handleRedirectResult()
  }, [])


  const params = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const clear = params.get('clear')
    if(clear) {
      localStorage.removeItem('@fictional:logged')
      router.push('/')
      return
    }
  
    // const isLogged = localStorage.getItem('@fictional:logged')
    
    // if(!isLogged && !clear && !user) {
    //   const provider = new GoogleAuthProvider()
    //   signInWithPopup(auth, provider)
    //   return
    // }
  }, [user, router, params])

  
  if(isLoading || !user) return <Loading />

  return (
    <main className="flex bg-violet-600 text-white min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-6xl max-w-lg text-center font-bold">Bem vindo(a) {user?.displayName?? 'Viajante'}</h1>
      <p className="mt-4 text-xl">Você já pode fechar essa aba</p>
      {user && (
        <button 
          className="mt-16 max-w-xs text-emerald-100"
          onClick={() => {
            const deepLink = `fictional://auth/success?authId=${user.uid}&email=${user.email}&name=${user.displayName}&photoUrl=${user.photoURL}&verified=${user.emailVerified}` 
            window.location.href = deepLink
          }}
        >
          Caso o aplicativo ainda não tenha saído da página de login, clique aqui
        </button>
      )}
    </main>
  );
}
