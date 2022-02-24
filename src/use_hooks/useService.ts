import {IAuthService} from 'core_app/services';
import {FactoryInjection} from 'core_app/infrastructure';
import {PUBLIC_TYPES} from 'core_app/infrastructure/Identifiers';

const useService = () => {
  const authService: IAuthService = FactoryInjection.get<IAuthService>(
    PUBLIC_TYPES.IAuthService,
  );

  return {authService};
};

export default useService;
