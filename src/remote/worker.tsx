/* eslint-disable no-restricted-globals */
import {retain, createEndpoint} from '@remote-ui/rpc';
import {createRoot, createRemoteRoot} from '@remote-ui/react';
import React from 'react';

import {RemoteApp} from './app';
import type {Endpoint} from '../types';

const endpoint = createEndpoint<Endpoint>(self, {callable: ['render']});
endpoint.expose({
  async render(receiver, api) {
    retain(receiver);
    retain(api);
    // const remoteRoot = createRemoteRoot(receiver, {components: ['Button', 'div']});
    const remoteRoot = createRemoteRoot(receiver);
    console.log('HELLO')
    const root = createRoot(remoteRoot);

    root.render(<div>HELLO</div>)
    // root.render(<RemoteApp api={api} />);
    await remoteRoot.mount();
  },
});

