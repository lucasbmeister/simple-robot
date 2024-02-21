// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { Link, Route, Routes } from 'react-router-dom';
import { BuildRobot } from './build-robot';
import { ControlRobot } from './control-robot';

export function App() {
  return (
    <div>
      <br />
      <hr />
      <br />
      <div role="navigation">
        <ul>
          <li>
            <Link to="/control">Control Robot</Link>
          </li>
          <li>
            <Link to="/build">Build Robot</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route
          path="/control"
          element={<ControlRobot/>}
        />
        <Route
          path="/build"
          element={<BuildRobot/>}
        />
      </Routes>
      {/* END: routes */}
    </div>
  );
}

export default App;
