import { Metadata } from "next";
import AIMIMHero from "../hero-section";

export const metadata: Metadata = {
  title: "AIMIM Parbhani - Official Website | All India Majlis-e-Ittehadul Muslimeen",
  description: "Welcome to AIMIM Parbhani official website. Join us as a volunteer in our mission for justice, equality, and community development in Parbhani, Maharashtra.",
  keywords: "AIMIM Parbhani, volunteer registration, political party Maharashtra, social justice, community development, Asaduddin Owaisi",
  openGraph: {
    title: "AIMIM Parbhani - Join as Volunteer",
    description: "Be a part of AIMIM Parbhani's mission for justice and equality. Register as a volunteer today.",
    images: ["/aimim-rally.jpg"],
  },
};

export default function Page() {
  return (
    <main>
      {/* Hidden content for SEO */}
      <div className="sr-only">
        <h1>AIMIM Parbhani - All India Majlis-e-Ittehadul Muslimeen</h1>
        <p>Official website of AIMIM Parbhani unit. Join our movement for social justice, equality, and community development in Parbhani, Maharashtra.</p>
        <p>Volunteer registration available at volunteer.mimparbhani.com</p>
      </div>
      
      <AIMIMHero />
      
      {/* Additional content sections can be added here */}
      <section className="hidden">
        <h2>About AIMIM Parbhani</h2>
        <p>All India Majlis-e-Ittehadul Muslimeen (AIMIM) Parbhani is committed to working for the welfare of all communities in Parbhani district, Maharashtra. We believe in unity, progress, and justice for all.</p>
        
        <h3>Our Mission</h3>
        <ul>
          <li>Promoting social justice and equality</li>
          <li>Community development and empowerment</li>
          <li>Educational advancement</li>
          <li>Healthcare accessibility</li>
          <li>Economic opportunities for all</li>
        </ul>
        
        <h3>Join as Volunteer</h3>
        <p>Become a part of our movement. Register as a volunteer and contribute to the development of Parbhani. Visit volunteer.mimparbhani.com to get started.</p>
      </section>
    </main>
  );
}
