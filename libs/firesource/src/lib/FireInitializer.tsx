import { FirebaseOptions } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import {
  AuthProvider,
  FirebaseAppProvider,
  FirestoreProvider,
  useFirebaseApp,
} from 'reactfire';

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  const app = useFirebaseApp();
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={firestore}>{children}</FirestoreProvider>
    </AuthProvider>
  );
};
export const FireInit: React.FC<
  React.PropsWithChildren<{
    appName: string;
    suspense?: boolean;
    firebaseConfig: FirebaseOptions;
  }>
> = ({ firebaseConfig, children, appName, suspense = true }) => {
  return (
    <FirebaseAppProvider
      appName={appName}
      suspense={suspense}
      firebaseConfig={firebaseConfig}
    >
      <Providers>{children}</Providers>
    </FirebaseAppProvider>
  );
};

export default FireInit;
