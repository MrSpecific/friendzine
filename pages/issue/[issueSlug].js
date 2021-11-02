import { useRouter } from 'next/router';
import { gql, getPaths, responsiveImageFragment } from '@data/datocms';

import Header from '../../components/Header';

export default function IssuePage(props) {
  const { fields } = props;
  const router = useRouter();
  const id = router.query;

  return (
    <>
      <Header>Issue</Header>
      <h2>{fields.title}</h2>
    </>
  );
}

const ISSUE_SLUGS_QUERY = gql`
  query IssueSlugs() {
    issue() {
      slug
    }
  }
`;

export async function getStaticPaths() {
  const data = await request({
    query: ISSUE_SLUGS_QUERY,
    variables: { limit },
    preview: false,
  });

  const paths = getPaths(allRecipes, 'recipeSlug');

  return {
    paths,
    fallback: false,
  };
}

const SINGLE_ISSUE_QUERY = gql`
  query Issue($slug: String) {
    recipe(filter: { slug: { eq: $slug } }) {
      title
      date
      # description
      slug
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

  ${responsiveImageFragment}
`;

export async function getStaticProps({ params }) {
  const data = await request({
    query: SINGLE_ISSUE_QUERY,
    variables: { slug: params.recipeSlug },
    preview: false,
  });

  return {
    props: data.recipe,
  };
}
