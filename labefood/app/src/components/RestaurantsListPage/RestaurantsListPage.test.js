import React from "react";
import axios from "axios";
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { RestaurantsList } from "./RestaurantsListPage";
import { restaurants } from "../../makeRestaurants";

describe("<App />", () => {
    test("Render <RestaurantsList /> component", async() => {
        render(<RestaurantsList />);
        await waitForElementToBeRemoved(() => screen.getByText(/carregando/i));

        expect(axios.get).toHaveBeenCalledTimes(1);
        restaurants.slice(0, 15).forEach( restaurant => {
            expect(screen.getByText(restaurant.name)).toBeInTheDocument();
        });
    });
});