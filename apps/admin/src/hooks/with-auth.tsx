/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from '~/components/loading';
import { useAuthValidation } from '~/hooks/use-validation';

export function withAuth(Component: any, redirectPath = '/auth/login') {
   return function AuthenticatedComponent(props = {}) {
      const { loading } = useAuthValidation(redirectPath);

      if (loading) return <Loading />;

      return <Component {...props} />;
   };
}
