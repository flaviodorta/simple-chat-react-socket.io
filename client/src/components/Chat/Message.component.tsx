import { memo, useEffect } from 'react';
import { useUserContext } from '../../context/User.context';
import { User } from '../../types/types';

interface Props {
  user: User;
}

export const Message = memo((props: Props): JSX.Element => {
  const { username } = useUserContext();

  useEffect(() => {
    // fetch avatar
  }, []);
  return <div>Message</div>;
});
