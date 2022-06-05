import { render, screen } from "@testing-library/react";
import { mocked } from 'jest-mock'
import { useSession } from 'next-auth/react'
import { SignInButton } from ".";

jest.mock("next-auth/react");

describe("SingButton", () => {
  it("renders correctly when user is not authenticated", () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce({ data: null, status: "loading"});


    render(<SignInButton />);

    expect(screen.getByText("Sign in with GitHub")).toBeInTheDocument();
  });

  it("renders correctly when user is authenticated", () => {
    const { debug } = render(<SignInButton />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });
});
