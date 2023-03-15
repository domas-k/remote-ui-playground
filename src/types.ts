import type {RemoteChannel} from '@remote-ui/core';

export type Endpoint = {
  render: (
    receiver: RemoteChannel,
    api: Api,
  ) => Promise<unknown>;
};

export interface Api {
  getMessage: () => Promise<string>
  log: (...msgs: any) => Promise<void>
}
