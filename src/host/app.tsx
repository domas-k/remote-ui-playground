import {createRef} from 'react';

import {TextInput} from './components/text-input';
import {RemoteRenderer} from './remote-renderer';

export const App = () => {
  const inputRef = createRef<HTMLInputElement>();

  return (
    <main>
      <TextInput id="msg" label="Message" ref={inputRef} />
      <div>
        <RemoteRenderer inputRef={inputRef} />
      </div>
    </main>
  );
}
