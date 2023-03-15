import { useEffect, useState } from 'react';
import { Api } from '../types';

interface Props {
  api: Api
}

const Button = 'Button' as any;

export const RemoteApp: React.FC<Props> = ({ api }) => {
  useEffect(() => {
    api.log('hello from remote')
  }, [api])

  return (
    <div>
      hello
      <span style={{ border: '1px solid black'}}>world</span>
      <Button onClick={api.handleClick}>
        click me
      </Button>
    </div>
  )
}
