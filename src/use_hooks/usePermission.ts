import {useEffect, useState} from 'react';
import {request, Permission} from 'react-native-permissions';

const usePermission = ({permission}: {permission: Permission}) => {
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    (async (): Promise<void> => {
      const granted = await request(permission);
      setPermissionGranted(granted === 'granted');
    })();
  });

  return {permissionGranted};
};

export default usePermission;
