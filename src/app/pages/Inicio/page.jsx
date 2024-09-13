import MenuCard from "@/app/_components/menuCard";
import HeaderLogin from "@/app/_components/header";
import PopularClubs from "@/app/_components/popularClubs";
import AnunciosFeed from "@/app/_components/anunciosFeed";
import Footer from "@/app/_components/footer";
function Page() {
    return (
        <div className="">
            <HeaderLogin/>
            <div className="mx-8 my-8 flex justify-between ">
                <MenuCard/>
                <AnunciosFeed/>
                <PopularClubs/>
                
            </div>
            
            
        </div>
    );
}
export default Page;