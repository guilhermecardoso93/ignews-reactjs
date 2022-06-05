import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import Post from "../../pages/posts/[slug]";

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

describe("Post", () => {
  it("renders right", () => {
    render(<Post post={post} />);

    expect(screen.getByText("Fake Post")).toBeInTheDocument();
    expect(screen.getByText("Post Fake")).toBeInTheDocument();
  });
/*
  it("prismic works", async () => {
    const prismicMocked = mocked(getPrismicClient);

    prismicMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: "fake-post",
            data: {
              title: [{ type: "heading", text: "Fake Post" }],
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
              updatedAt: "10 de abril de 2021"
            }
          ]
        }
      })
    );
  });*/
});
