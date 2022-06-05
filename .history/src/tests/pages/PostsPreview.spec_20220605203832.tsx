import { render, screen } from "@testing-library/react";
import { getSession } from "next-auth/react";
import { mocked } from "jest-mock";
import Post, { getStaticProps } from "../../pages/posts/preview/[slug]";
import { getPrismicClient } from "../../services/prismic";

const post = {
  slug: "fake-post",
  title: "Fake Post",
  content: "<p>Post Fake</p>",
  updatedAt: "10 de abril de 2021"
};

jest.mock("../../services/prismic");
jest.mock("next-auth/react");

describe("PostPreview", () => {
  it("renders correctly", () => {
    render(<Post post={post} />);

    expect(screen.getByText("My New Post")).toBeInTheDocument();
    expect(screen.getByText("Post excerpt")).toBeInTheDocument();
  });

  it("redirects user if no subscription is found", async () => {
    const getSessionMocked = mocked(getSession);
    getSessionMocked.mockResolvedValueOnce({ activeSubscription: null } as any);

    const response = await getServerSideProps({
      params: { slug: "fake-post" }
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: "/"
        })
      })
    );
  });

  it("loads initial data", async () => {
    const getSessionMocked = mocked(getSession);

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

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: "fake-active-subscription"
    } as any);

    const response = await getServerSideProps({
      params: { slug: "fake-post" }
    } as any);

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
