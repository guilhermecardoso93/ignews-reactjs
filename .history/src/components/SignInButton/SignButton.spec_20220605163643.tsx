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
     const {debug} = render(<SignInButton />);

    expect(screen.getByText("Sign in with GitHub")).toBeInTheDocument();
  });
});
