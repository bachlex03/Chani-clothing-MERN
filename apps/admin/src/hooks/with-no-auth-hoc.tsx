/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from '~/components/loading';
import { useNoAuthValidation } from '~/hooks/use-no-auth-validation';

export function withNoAuth(Component: any, redirectPath = '/dashboards') {
   return function NoAuthComponent(props: any) {
      const { loading } = useNoAuthValidation(redirectPath);

      if (loading) return <Loading />;

      return <Component {...props} />;
   };
}
