import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import { useSession } from "next-auth/react";
import { SubscribeButton } from ".";

jest.mock("next-auth/react");

describe("SubscribeButton", () => {
  it("renders correctly", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({ data: null, status: "loading" });

    render(<SubscribeButton />);

    expect(screen.getByText("Sign in with GitHub")).toBeInTheDocument();
  });

  
});
