'use client'
import HeaderLogin from "@/app/_components/header";
import MenuCard from "@/app/_components/menuCard";
import GroupForm from "@/app/_components/clubConfigForm";
export default function ClubConfig() {
    return (
        <div>
            <HeaderLogin />
            <main className="py-8 px-10 flex row-span-2 flex-wrap gap-4">
                <section className="w-[25%]">
                    <MenuCard />
                </section>
                <section className="w-[73%]">
                    <GroupForm/>
                </section>


            </main>
        </div>
    )


}