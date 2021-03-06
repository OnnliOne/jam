import React, {useMemo} from 'react';
import {render} from 'react-dom';
import {usePath} from './lib/use-location';
import Jam from './Jam';
import Start from './views/Start';

render(<App />, document.querySelector('#root'));

function App() {
  // detect roomId from URL
  const [roomId = null] = usePath();

  // detect new room config from URL
  let newRoom = useMemo(
    () => (location.hash ? parseParams(location.hash.slice(1)) : undefined),
    [roomId] // don't worry, this is fine
  );

  return (
    <Jam
      style={{height: '100vh'}}
      roomId={roomId}
      newRoom={newRoom}
      onError={({error}) => {
        return (
          <Start urlRoomId={roomId} roomFromURIError={!!error.createRoom} />
        );
      }}
    />
  );
}

function parseParams(params) {
  let res = params.split('&').reduce(function (res, item) {
    var parts = item.split('=');
    res[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
    return res;
  }, {});
  return res;
}
