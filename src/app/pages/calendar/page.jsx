"use client";
import HeaderLogin from "@/app/_components/headerlogin";
import Calendar from "@/app/_components/calendar";
import MenuCard from "@/app/_components/menuCard";

function CalendarPage() {
  return (
    <div>
      <HeaderLogin />
      <main className="w-full h-[87%] box-border overflow-hidden flex">
        <section className="w-1/4 p-4">
          <MenuCard /> {/* Aquí se incluye el componente MenuCard */}
        </section>
        <section className="w-3/4 px-7 flex flex-col justify-center align-middle">
          <Calendar />
        </section>
      </main>
    </div>
  );
}

export default CalendarPage;
