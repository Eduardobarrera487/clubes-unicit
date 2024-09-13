"use client";
import HeaderLogin from "@/app/_components/header";
import LoginCard from "@/app/_components/loginCard";
import BackgroundVideo from "@/app/_components/backgroundVideo";
import CustomCard from "@/app/_components/infoCard";
import PasswordRecovery from "@/app/_components/passwordRecovery";
function PageLogin() {
    return (
        <div className="">
            <HeaderLogin />
            <main className=" w-full h-[87%] box-border overflow-hidden ">
                <BackgroundVideo video={"/video_home.mp4"} />
                <div class=" flex flex-col justify-center h-auto ">
                    <h1 className=" mt-4 font-bold text-white text-6xl text-center text-shadow-2xl w-full h-auto" >
                        ¡Bienvenido a la comunidad de clubes
                    </h1>
                    <h1 className="font-bold text-white text-[4rem] text-center text-shadow-2xl w-full h-auto" >
                        UNICIT!
                    </h1>
                </div>
                <div class="grid grid-cols-2 ">
                    <section className="w-full px-7 relative flex flex-col justify-center align-middle">
                        <ul className="w-[80%] relative left-[12.5%]">
                            <li className=" w-[90%] bg-[#274790] flex justify-center text-white py-4 px-4 border border-transparent 
                            text-2xl font-semibold rounded-md h-auto "> Descubrí, unite y creá clubes</li>
                            <li className=" text-white py-2 font-semibold text-shadow-2xl text-2xl">✓ Fomenta tu pasión</li>
                            <li className=" text-white py-2 font-semibold text-shadow-2xl text-2xl">✓compartí intereses con compañeros</li>
                            <li className=" text-white py-2 font-semibold text-shadow-2xl text-2xl">✓compartí intereses con compañeros</li>
                        </ul>
                    </section>
                    <section className="flex relative flex-row justify-center pl-5">
                        <LoginCard />
                    </section>
                </div>
            </main>
            <section className="w-full h-1/3 mt-4">
                <div className="py-9 flex flex-row flex-wrap gap-3 px-7">
                    <CustomCard imageSrc={"https://campusvirtual.unicit.edu.ni/grado/pluginfile.php/1/theme_moove/marketing3icon/1723504507/Botones%20Web_Campus%20Virtual_Biblioteca%20Virtual.png"} url={"https://elibro.net/es/lc/unicit/login_usuario/?next=/es/lc/unicit/inicio/"}/>
                    <CustomCard imageSrc={"https://campusvirtual.unicit.edu.ni/grado/pluginfile.php/1/theme_moove/marketing2icon/1723504507/Botones%20Web_Campus%20Virtual_Biblioteca%20Virtual%20copia%204.png"} url={"https://sites.google.com/unicit.edu.ni/campus-virtual/inicio"}/>
                    <CustomCard imageSrc={"https://campusvirtual.unicit.edu.ni/grado/pluginfile.php/1/theme_moove/marketing1icon/1723504507/Botones%20Web_Campus%20Virtual_Biblioteca%20Virtual%20copia%202.png"} url={"https://portales.unicit.edu.ni/"}/>
                    <CustomCard imageSrc={"//campusvirtual.unicit.edu.ni/grado/pluginfile.php/1/theme_moove/marketing4icon/1723504507/Botones%20Web_Campus%20Virtual_Biblioteca%20Virtual%20copia%203.png"} url={"http://repositorio.unicit.edu.ni/"}/>
                </div>
            </section>
            <PasswordRecovery/>
        </div>
        
    );
}

export default PageLogin;