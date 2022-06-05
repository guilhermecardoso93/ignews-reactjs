import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { mocked } from "jest-mock";
import Post, { getStaticProps } from "../../pages/posts/preview/[slug]";
import { getPrismicClient } from "../../services/prismic";
import { useRouter } from "next/router";

const post = {
  slug: "fake-post",
  title: "Fake Post",
  content: "<p>Post Fake</p>",
  updatedAt: "10 de abril de 2021"
};

jest.mock("../../services/prismic");
jest.mock("next-auth/react");
jest.mock("next/router");

describe("PostPreview", () => {
  it("renders correctly", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({ data: null, status: "loading" });
    render(<Post post={post} />);

    expect(screen.getByText("My New Post")).toBeInTheDocument();
    expect(screen.getByText("Post excerpt")).toBeInTheDocument();
    expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument();
  });

  it("redirects user to full post", async () => {
    const useSessionMocked = mocked(useSession);
    const useRouterMocked = mocked(useRouter);
    const pushMock = jest.fn();

    useSessionMocked.mockReturnValueOnce([
      { activeSubscription: "fake-active" },
      false
    ] as any);

    useRouterMocked.mockReturnValueOnce({
      push: pushMock
    } as any);

    render(<Post post={post} />);
    expect(pushMock).toHaveBeenCalledWith("/posts/fake-post");
  });

  it("loads initial data", async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);
    getPrismicClientMocked.mockReturnValueOnce({
      getByID: jest.fn().mockRejectedValueOnce({
        data: {
          title: [{ type: "heading", text: "Fake Post" }],
          content: [{ type: "paragraph", text: "Post Fake" }]
        },
        last_publication_date: "04-10-2021"
      })
    } as any);
    const response = await getStaticProps({ params: { slug: "fake-post" }} as any);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: "fake-post",
            title: "Fake Post",
            content: "<p>Post Fake</p>",
            updatedAt: "10 de abril de 2021"
          }
        }
      })
    );
  });
});
