import { useEffect, useState } from 'react';
import { createRemoteReactComponent } from '@remote-ui/react'
import { Api } from '../types';
import { ButtonProps } from '../host/components/button';

interface Props {
  api: Api
}

const Button = createRemoteReactComponent<'Button', ButtonProps>('Button');

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
      <Button onClick={() => api.getMessage().then(api.log)} >
        read message
      </Button>
    </div>
  )
}
