// import App from 'next/app';
import { useContext } from 'react';
import { gql, request } from '@data/datocms';
import { AppContextProvider, AppContext } from '@data/context';
import useConstructor from '@utils/hooks/useConstructor';
import '../styles/globals.css';

const AppData = ({ currentIssue }) => {
  const { setcurrentIssue } = useContext(AppContext);

  useConstructor(() => {
    if (currentIssue) setcurrentIssue(currentIssue);
  });

  return null;
};

function MyApp({ Component, pageProps, currentIssue }) {
  return (
    <AppContextProvider>
      <AppData currentIssue={currentIssue} />
      <Component {...pageProps} />
    </AppContextProvider>
  );
}

const NAV_QUERY = gql`
  {
    allIssues(first: 1, orderBy: [date_DESC]) {
      id
      title
      slug
    }
  }
`;

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const navData = await request({
    query: NAV_QUERY,
    preview: false,
  });
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps, currentIssue: navData?.allIssues[0] };
};

export default MyApp;
