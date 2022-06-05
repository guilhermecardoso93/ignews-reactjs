import { render, screen } from "@testing-library/react";
import { getSession } from "next-auth/react";
import { mocked } from "jest-mock";
import Post, { getServerSideProps } from "../../pages/posts/[slug]";
import { getPrismicClient } from "../../services/prismic";

const post = [
  {
    slug: "fake-post",
    title: "Fake Post",
    content: "<p>Post Fake</p>",
    updatedAt: "10 de abril de 2021"
  }
];

jest.mock("../../services/prismic");
jest.mock("next-auth/react");

describe("Post", () => {
  it("renders right", () => {
    render(<Post post={post} />);

    expect(screen.getByText("Fake Post")).toBeInTheDocument();
    expect(screen.getByText("Post Fake")).toBeInTheDocument();
  });

  it("redirects user if no subscription is found", async () => {
    const getSessionMocked = mocked(getSession);

    const response = await getServerSideProps({
      req: {
        cookies: {}
      }
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: {
          destination: "/"
        }
      })
    );
  });

  /*
  ;*/
});
