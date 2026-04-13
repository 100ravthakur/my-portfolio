import "./App.css";
import Header from "./components/header.jsx";
import About from "./components/about.jsx";
import Skills from "./components/skills.jsx";
import Experience from "./components/experience.jsx";
import Projects from "./components/projects.jsx";
import WhyHireMe from "./components/whyhireme.jsx";
import CTA from "./components/cta.jsx";

function App() {
  return (
    <>
      <Header />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <WhyHireMe />
      <CTA />
    </>
  );
}

export default App;
