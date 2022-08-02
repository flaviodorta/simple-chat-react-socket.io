import { memo, useEffect } from 'react';
import { User } from '../../types/types';

interface Props {
  user: User
}

export const Message = memo((props: Props): JSX.Element => {
  useEffect(() => {
    // fetch avatar
  }, [])
  return <div>Message</div>;
});
