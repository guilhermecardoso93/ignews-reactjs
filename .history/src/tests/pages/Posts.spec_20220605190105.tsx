import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import Posts, { getStaticProps } from "../../pages/posts";
import { getPrismicClient } from '../../services/prismic'

const post = [
  { slung: "Fake Post", title: "Fake Post", expect: "Post Fake", updateAt: "10 de Abril" }
];

jest.mock('../../services/prismic')

describe("Posts", () => {

  it("renders right", () => {
    render(<Posts posts={post} />);

    expect(screen.getByText("Fake Post")).toBeInTheDocument();
  });
});
