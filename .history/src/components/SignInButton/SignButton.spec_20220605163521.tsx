import { render, screen } from "@testing-library/react";
import { SignInButton } from ".";

jest.mock("next-auth/react", () => {
  return {
    useSession() {
      return [null, false];
    }
  };
});

describe("SingButton", () => {
  it("renders correctly when user is not authenticated", () => {
     render(<SignInButton />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Posts")).toBeInTheDocument();
  });
});
