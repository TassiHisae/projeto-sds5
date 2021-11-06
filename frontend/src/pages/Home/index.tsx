import Footer from "components/Footer";
import NavBar from "components/NavBar";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <NavBar />
            <div className="container">
                <div className="jumbotron">
                    <h1 className="display-4">DSVendas</h1>
                    <p className="lead">Analyze your sales performance from different perspectives</p>
                    <hr />
                    <p>This app consists of displaying a panel of data provided by a backend built with Spring Boot.</p>
                    <Link className="btn btn-primary btn-large" to="/dashboard">Dashboard Access</Link>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Home;