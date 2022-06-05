import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import Posts, { getStaticProps, Post } from "../../pages/posts";

import { getPrismicClient } from "../../services/prismic";

const posts = [
  {
    slug: "fake-slug",
    title: "Fake title 1",
    excerpt: "Fake excerpt 1",
    updatedAt: "2020-01-01",
  },
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
              content: [{ type: "paragraph", text: "Post excerpt" }]
            },
            last_publication_date: "04-01-2021"
          }
        ]
      })
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [{
              slung: "fake-post",
              title: "Fake Post",
              expect: "Post Fake",
              updateAt: "10 de Abril"
            }]
        }
      })
    );
  });
});
