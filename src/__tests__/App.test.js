import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";
import CharacterItem from "../components/characters/CharacterItem";
import Search from "../components/UI/Search";
import Header from "../components/UI/Header";

// Mock axios so tests don't make real network calls
jest.mock("axios", () => ({
  get: jest.fn(() =>
    Promise.resolve({
      data: [
        {
          char_id: 1,
          name: "Walter White",
          birthday: "09-07-1958",
          occupation: ["High School Chemistry Teacher", "Meth King Pin"],
          img: "https://images.amcnetworks.com/amc.com/wp-content/uploads/2015/04/cast_bb_700x1000_walter-white-lg.jpg",
          status: "Presumed dead",
          nickname: "Heisenberg",
          appearance: ["1", "2", "3", "4", "5"],
          portrayed: "Bryan Cranston",
          category: "Breaking Bad",
          better_call_saul_appearance: []
        },
        {
          char_id: 2,
          name: "Jesse Pinkman",
          birthday: "09-24-1984",
          occupation: ["Meth Dealer"],
          img: "https://vignette.wikia.nocookie.net/breakingbad/images/9/95/JesseS5.jpg/revision/latest?cb=20120620012441",
          status: "Alive",
          nickname: "Cap n' Cook",
          appearance: ["1", "2", "3", "4", "5"],
          portrayed: "Aaron Paul",
          category: "Breaking Bad",
          better_call_saul_appearance: []
        }
      ]
    })
  )
}));

describe("Header Component", () => {
  test("renders logo and archive subtitle", () => {
    render(<Header />);
    expect(screen.getByAltText("Breaking Bad Logo")).toBeInTheDocument();
    expect(screen.getByText(/Better Call Saul Archive/i)).toBeInTheDocument();
  });
});

describe("Search Component", () => {
  test("allows typing and clearing query", () => {
    const mockGetQuery = jest.fn();
    render(<Search getQuery={mockGetQuery} totalCount={62} filteredCount={62} />);

    const input = screen.getByPlaceholderText(/search characters/i);
    fireEvent.change(input, { target: { value: "Walter" } });

    expect(input.value).toBe("Walter");
    expect(mockGetQuery).toHaveBeenCalledWith("Walter");

    const clearBtn = screen.getByTitle("Clear search");
    fireEvent.click(clearBtn);

    expect(input.value).toBe("");
    expect(mockGetQuery).toHaveBeenCalledWith("");
  });
});

describe("CharacterItem Component", () => {
  const mockChar = {
    char_id: 1,
    name: "Walter White",
    birthday: "09-07-1958",
    occupation: ["Chemistry Teacher"],
    img: "https://test.com/walter.jpg",
    status: "Presumed dead",
    nickname: "Heisenberg",
    appearance: ["1", "2"],
    portrayed: "Bryan Cranston",
    category: "Breaking Bad"
  };

  test("renders character details and flips on click", () => {
    const { container } = render(<CharacterItem item={mockChar} />);
    expect(screen.getAllByText("Walter White").length).toBeGreaterThan(0);
    expect(screen.getByText("Bryan Cranston")).toBeInTheDocument();

    const card = container.querySelector(".card");
    expect(card).not.toHaveClass("flipped");

    fireEvent.click(card);
    expect(card).toHaveClass("flipped");
  });
});

describe("App Integration", () => {
  test("renders characters list after loading", async () => {
    render(<App />);

    // Initially shows spinner
    expect(screen.getByAltText(/loading characters/i)).toBeInTheDocument();

    // After async resolution, Walter White and Jesse Pinkman should appear
    const walterElements = await screen.findAllByText("Walter White");
    expect(walterElements.length).toBeGreaterThan(0);

    const jesseElements = await screen.findAllByText("Jesse Pinkman");
    expect(jesseElements.length).toBeGreaterThan(0);
  });
});
