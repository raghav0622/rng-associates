import { AdminLayout } from '@rng-associates/admin-layout';
import { FireInit } from '@rng-associates/firesource';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Suspense } from 'react';
import NavLinks from '../components/NavLinks';
import NoSSR from '../components/NoSSR';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>R.N. Goyal &amp; Associates</title>
      </Head>
      <NoSSR>
        <Suspense fallback={<>App Loader</>}>
          <FireInit
            appName="RNG Associates"
            firebaseConfig={{
              apiKey: 'AIzaSyD6nY2QcqLXkNfqZlzlxYvP8c5HB849wjw',
              authDomain: 'rng-civil-latest.firebaseapp.com',
              projectId: 'rng-civil-latest',
              storageBucket: 'rng-civil-latest.appspot.com',
              messagingSenderId: '412674472988',
              appId: '1:412674472988:web:3582f786e99f3a69ed73d9',
              measurementId: 'G-0RWGCJ2WNP',
            }}
          >
            <AdminLayout appName="RNG Associates" navlinks={<NavLinks />}>
              <Component {...pageProps} />
            </AdminLayout>
          </FireInit>
        </Suspense>
      </NoSSR>
    </>
  );
}

export default CustomApp;
