import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "./Footer";


// Create a mock store
const selectedRest : string = "McDonald's, Avenue Jean Médecin, Quartier Jean-Médecin, Nice, Maritime Alps, Provence-Alpes-Côte d'Azur, Metropolitan France, 06000, France";


test("Updates the footer with a selected restaurant", () => {
    render(
        <Footer selectedRestaurant={selectedRest} />
    );
  expect(screen.getByText(selectedRest)).toBeInTheDocument();
});
