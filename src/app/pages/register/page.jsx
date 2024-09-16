'use client'
import RegistroForm from "@/app/_components/formRegistro"
import BackgroundVideo from "@/app/_components/backgroundVideo"
import HeaderLogin from "@/app/_components/header"
export default function Register() {
    return (<div>
        <HeaderLogin/>
        <main className="w-full h-full relative py-5">
        <BackgroundVideo video={"/video_home.mp4"} />
            <RegistroForm/>
        </main>
    </div>)

}