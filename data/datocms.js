import { gql, GraphQLClient } from 'graphql-request';

export { gql };

export function request({ query, variables, preview }) {
  const endpoint = preview ? `https://graphql.datocms.com/preview` : `https://graphql.datocms.com/`;

  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
    },
  });

  return client.request(query, variables);
}

export const getPaths = (entries, identifier = 'slug') => {
  const paths = entries.map((entry) => {
    return {
      params: {
        [identifier]: entry.slug || entry.fields.slug,
      },
    };
  });

  return paths;
};

// See: https://www.datocms.com/blog/offer-responsive-progressive-lqip-images-in-2020
export const responsiveImageFragment = gql`
  fragment responsiveImageFragment on ResponsiveImage {
    srcSet
    webpSrcSet
    sizes
    src
    width
    height
    aspectRatio
    alt
    title
    bgColor
    base64
  }
`;

const RECIPE_LIST_QUERY = gql`
  query HomePage($limit: IntType) {
    allRecipes(first: $limit) {
      title
      slug
      cover {
        responsiveImage(imgixParams: { fit: crop, w: 600, h: 600 }) {
          ...responsiveImageFragment
        }
      }
    }
  }

  ${responsiveImageFragment}
`;

export async function getRecipeList(options = {}) {
  const { limit = 10 } = options;

  const data = await request({
    query: RECIPE_LIST_QUERY,
    variables: { limit },
    preview: false,
  });

  return data.allRecipes;
}
