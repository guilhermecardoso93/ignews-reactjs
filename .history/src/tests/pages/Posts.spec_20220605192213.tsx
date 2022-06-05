import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import Posts, { getStaticProps, Post } from "../../pages/posts";

import { getPrismicClient } from "../../services/prismic";

const posts = [
  {
    slug: "fake-post",
    title: "Fake Post",
    excerpt: "Post Fake",
    updatedAt: "10 de Abril"
  }
] as Post[];

jest.mock("../../services/prismic");

describe("Posts", () => {
  it("renders right", () => {
    render(<Posts posts={posts} />);

    expect(screen.getByText("Fake Post")).toBeInTheDocument();
  });

  it("prismic works", async () => {
    const prismicMocked = mocked(getPrismicClient);

    prismicMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: "fake-post",
            data: {
              title: [{ type: "heading", text: "Fake Post " }],
              content: [{ type: "paragraph", text: "Post Fake" }]
            },
            last_publication_date: "04-10-2021"
          }
        ]
      })
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: "fake-post",
              title: "Fake Post",
              excerpt: "Post Fake",
              updatedAt: "10 de Abril"
            }
          ]
        }
      })
    );
  });
});
