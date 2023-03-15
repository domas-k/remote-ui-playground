import React, {useMemo, useEffect} from 'react';
import { createPlainWorkerFactory } from '@shopify/web-worker'
import {createEndpoint, fromWebWorker} from '@remote-ui/rpc';
import {
  createController,
  createRemoteReceiver,
  RemoteRenderer as RemoteUIRenderer,
} from '@remote-ui/react/host';
import {Endpoint} from '../types';
import { Button } from './components/button';

const createWorker = createPlainWorkerFactory(
  // () => import(/* webpackChunkName: 'myWorker' */ '../remote/worker'),
  () => import('../remote/worker'),
);
const worker = createWorker()
const remoteEndpoint = createEndpoint<Endpoint>(fromWebWorker(worker));

interface Props {
  inputRef: React.RefObject<HTMLInputElement>;
}

export const RemoteRenderer: React.FC<Props> = ({ inputRef }) => {
  const receiver = useMemo(() => createRemoteReceiver(), []);
  const controller = useMemo(() => createController({
    Button,
    div: (props) => <div {...props} />,
  }), []);

  useEffect(() => {
    async function run() {
      await remoteEndpoint.call.render(receiver.receive, {
        getMessage: async () => inputRef.current!.value,
        log: async (...msgs: any) => console.log('FROM REMOTE: ', ...msgs)
      })
    }
    run();
  }, [receiver, inputRef]);

  return <RemoteUIRenderer receiver={receiver} controller={controller} />;
}
