'use client';

import { EntityProvider } from '@rng-associates/accounts';
import { AdminLayout } from '@rng-associates/admin-layout';
import { FireInit } from '@rng-associates/firesource';
import { NavLinks } from '../layout';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" id="root">
      <body>
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
          suspense={true}
        >
          <EntityProvider id="B8OBTrHtBtNnnWeS3xiO">
            <AdminLayout appName="Entity: Raghav Goyal" navlinks={<NavLinks />}>
              {children}
            </AdminLayout>
          </EntityProvider>
        </FireInit>
      </body>
    </html>
  );
}
