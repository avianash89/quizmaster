import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Quizly from "../components/Quizly/Quizly";

function Upload() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen mt-[5rem]">
        <Quizly />
      </div>
      <Footer />
    </>
  );
}

export default Upload;
