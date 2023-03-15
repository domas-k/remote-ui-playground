import {createRef, RefObject, useEffect, useRef, useState} from 'react';
import { Api } from '../types';

import {TextInput} from './components/text-input';
import {RemoteRenderer} from './remote-renderer';

export const App = () => {
  const inputRef = createRef<HTMLInputElement>();
  const [count, setCount] = useState(0)

  const api: RefObject<Api> = useRef({
      getMessage: async () => inputRef.current!.value,
      log: async (...msgs: any) => console.log('FROM REMOTE: ', ...msgs),
      handleClick: async () => setCount(prev => prev + 1)
  })

  return (
    <main>
      <TextInput id="msg" label="Message to remote" ref={inputRef} />
      <div>Click count: {count}</div>
      <div style={{ border: '2px dashed red'}}>
        {api.current && <RemoteRenderer api={api.current} />} 
      </div>
    </main>
  );
}
