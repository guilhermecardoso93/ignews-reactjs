import { render, screen, fireEvent } from "@testing-library/react";
import { mocked } from "jest-mock";
import { signIn } from "next-auth/react";
import { SubscribeButton } from ".";

jest.mock("next-auth/react", () => {
  return {
    useSession() {
      return [null, false];
    },
    signIn: jest.fn()
  };
});

describe("SubscribeButton", () => {
  it("renders correctly", () => {
    render(<SubscribeButton />);

    expect(screen.getByText("Subscribe now")).toBeInTheDocument();
  });

  it("redirect user to  sing when not authenticated", () => {
    const signInMocked = mocked(signIn);

    render(<SubscribeButton />);

    const button = screen.getByText("Subscribe now");

    fireEvent.click(button);

    expect(signInMocked).toHaveBeenCalled;
  });
});
