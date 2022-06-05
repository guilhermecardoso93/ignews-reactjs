import { render, screen, fireEvent } from "@testing-library/react";
import { mocked } from "jest-mock";
import { signIn, useSession } from "next-auth/react";
import push, { useRouter } from "next/router";
import { SubscribeButton } from ".";

jest.mock("next-auth/react", () => {
  return {
    useSession() {
      return [null, false];
    },
    signIn: jest.fn()
  };
});

jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        push: jest.fn()
      };
    }
  };
});

describe("SubscribeButton", () => {
  it("renders correctly", () => {
    render(<SubscribeButton />);

    expect(screen.getByText("Subscribe Now")).toBeInTheDocument();
  });

  it("redirect user to  sing when not authenticated", () => {
    const signInMocked = mocked(signIn);

    render(<SubscribeButton />);

    const button = screen.getByText("Subscribe Now");

    fireEvent.click(button);

    expect(signInMocked).toHaveBeenCalled();
  });

  it("redirect to posts when user already have a subscription", () => {
    const userRouterMocked = mocked(useRouter);
    const useSessionMocked = mocked(useSession);
    const pushMock = jest.fn();

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: { name: "John Doe", email: "john.doe@example.com" },
        expires: "fake-expires",
        activeSubscription: 'fake'
      }
    } as any);

    userRouterMocked.mockReturnValueOnce({
      push: pushMock
    } as any);

    render(<SubscribeButton />);

    const button = screen.getByText("Subscribe Now");

    fireEvent.click(button);

    expect(pushMock).toHaveBeenCalled();
  });
});
