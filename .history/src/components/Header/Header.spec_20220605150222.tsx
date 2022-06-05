import { render } from "@testing-library/react";
import { Header } from ".";

jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        asPath: "/"
      };
    }
  };
});

jest.mock("next-auth/client", () => {
  return {
    useSession(){
      return[null, false]
    }
  };
});

describe("Header is Working", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Header />);

    expect(getByText("Home")).toBeInTheDocument();
    expect(getByText("Post")).toBeInTheDocument();
  });
});
