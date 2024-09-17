'use client'
import Header from "@/app/_components/header";
import MenuCard from "@/app/_components/menuCard";
import UserForm from "@/app/_components/userForm";
export default function UserConfig() {
    return (
        <div>
            <Header />
            <main className="py-8 px-10 flex row-span-2 flex-wrap gap-4">
                <section className="w-[25%]">
                    <MenuCard />
                </section>
                <section className="w-[70%]">
                    <UserForm />
                </section>


            </main>
        </div>
    )


}