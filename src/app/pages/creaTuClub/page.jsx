'use client'
import ClubForm from "@/app/_components/formClub"
import Footer from "@/app/_components/footer"
import BackgroundVideo from "@/app/_components/backgroundVideo"
import HeaderLogin from "@/app/_components/header"
export default function CrearClub() {
    return (<div>
        <HeaderLogin/>
        <BackgroundVideo video={"/video_home.mp4"} />
        <main className="w-full h-[88vh]">
            <ClubForm/>
        </main>
        <Footer />
        
    </div>)

}