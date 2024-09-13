'use client'
import ClubForm from "@/app/_components/formClub"
import Footer from "@/app/_components/footer"
import BackgroundVideo from "@/app/_components/backgroundVideo"
import HeaderLogin from "@/app/_components/header"
export default function CrearClub() {
    return (<div>
        <HeaderLogin/>
        <main className="w-full h-full relative py-5">
        <BackgroundVideo video={"/video_home.mp4"} />
            <ClubForm/>
        </main>
    </div>)

}