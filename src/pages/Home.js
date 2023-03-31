import Header from "../components/User/header/header";
import HomeBanner from "../components/User/homebanner/homeBanner";
import HospitalCard from "../components/User/hospitalCard/hospitalCard";


function HomePage() {
    return (

        <>
            <div>
                <Header />
                <HomeBanner />
            </div>
            <div>
                <HospitalCard />
            </div>
        </>

    )
}

export default HomePage;
