import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import { stripe } from "../../services/stripe";
import Home, {getStaticProps } from "../../pages";

jest.mock("next/router");
jest.mock("next-auth/react", () => {
  return {
    useSession: () => [null, false]
  };
});
jest.mock("../../services/stripe");
describe("Home Page", () => {
  it("renders correctly", () => {
    render(<Home product={{ priceId: "fake-price", amount: "R$ 10,00" }} />);

    expect(screen.getByText("for R$ 10,00 month")).toBeInTheDocument();
  });

  it("loads initial data", async  () => {
    const stripeMocked = mocked(stripe.prices.retrieve);

    stripeMocked.mockResolvedValueOnce({
      id: "fake",
      unit_amount: 1000
    } as any);

    const response = await getStaticProps({})

    expect
  });
});
