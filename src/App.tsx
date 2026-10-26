import { ShoppingListProvider } from "./store/ShoppingListContext";
import { Header } from "./components/Header";
import { Hero, Ticker } from "./components/Hero";
import { Categories } from "./components/Categories";
import { Browse } from "./components/Browse";
import { Deals } from "./components/Deals";
import { HowItWorks } from "./components/HowItWorks";
import { About } from "./components/About";
import { Visit } from "./components/Visit";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { FloatingListButton, ShoppingListPanel } from "./components/ShoppingList";

export default function App() {
  return (
    <ShoppingListProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:border-2 focus:border-ink focus:bg-sun focus:px-4 focus:py-2 focus:text-sm focus:font-black focus:uppercase"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Ticker />
        <Categories />
        <Browse />
        <Deals />
        <HowItWorks />
        <About />
        <Visit />
        <Contact />
      </main>
      <Footer />
      <ShoppingListPanel />
      <FloatingListButton />
    </ShoppingListProvider>
  );
}
