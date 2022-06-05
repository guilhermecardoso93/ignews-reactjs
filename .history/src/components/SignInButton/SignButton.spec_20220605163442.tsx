import { render, screen } from "@testing-library/react";
import { SignInButton } from ".";

jest.mock("next-auth/react", () => {
  return {
    useSession() {
      return [null, false];
    }
  };
});

describe("SingButton is Working", () => {
  it("renders correctly", () => {
     render(<SignInButton />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Posts")).toBeInTheDocument();
  });
});
