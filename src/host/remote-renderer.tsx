import React, {useMemo, useEffect} from 'react';
import { createPlainWorkerFactory } from '@shopify/web-worker'
import {createEndpoint, fromWebWorker} from '@remote-ui/rpc';
import {
  createController,
  createRemoteReceiver,
  RemoteRenderer as RemoteUIRenderer,
} from '@remote-ui/react/host';
import {Api, Endpoint} from '../types';
import { Button } from './components/button';

const createWorker = createPlainWorkerFactory(
  // () => import(/* webpackChunkName: 'myWorker' */ '../remote/worker'),
  () => import('../remote/worker'),
);
const worker = createWorker()
const remoteEndpoint = createEndpoint<Endpoint>(fromWebWorker(worker));

interface Props {
  api: Api
}

export const RemoteRenderer: React.FC<Props> = ({ api }) => {
  const receiver = useMemo(() => createRemoteReceiver(), []);
  const controller = useMemo(() => createController({
    Button,
    div: (props) => <div {...props} />,
    span: (props) => <span {...props} />,
  }), []);

  useEffect(() => {
    async function run() {
      await remoteEndpoint.call.render(receiver.receive, api)
    }
    run();
  }, [receiver, api]);

  return <RemoteUIRenderer receiver={receiver} controller={controller} />;
}
