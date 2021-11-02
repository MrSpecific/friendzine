import { useRouter } from 'next/router';
import { gql, request, getPaths, responsiveImageFragment } from '@data/datocms';

import Header from '../../components/Header';

export default function IssuePage(props) {
  const { data } = props;
  const router = useRouter();
  const id = router.query;

  return (
    <>
      <Header>Issue</Header>
      <h2>{data.title}</h2>
    </>
  );
}

const ISSUE_SLUGS_QUERY = gql`
  {
    allIssues {
      slug
    }
  }
`;

export async function getStaticPaths() {
  const data = await request({
    query: ISSUE_SLUGS_QUERY,
    preview: false,
  });

  const paths = getPaths(data.allIssues, 'issueSlug');

  return {
    paths,
    fallback: false,
  };
}

const SINGLE_ISSUE_QUERY = gql`
  query Issue($slug: String) {
    allIssues(filter: { slug: { eq: $slug } }) {
      title
      date
      slug
      # description
      # cover {
      #   responsiveImage(imgixParams: { fit: crop, w: 1400, h: 800 }) {
      #     ...responsiveImageFragment
      #   }
      # }
      # author {
      #   name
      # }
      # categories {
      #   title
      #   slug
      # }
      # tags {
      #   title
      # }
      # gallery {
      #   id
      # }
    }
  }
`;
// # ${responsiveImageFragment}

export async function getStaticProps({ params }) {
  const data = await request({
    query: SINGLE_ISSUE_QUERY,
    variables: { slug: params.issueSlug },
    preview: false,
  });

  return {
    props: { data },
  };
}
