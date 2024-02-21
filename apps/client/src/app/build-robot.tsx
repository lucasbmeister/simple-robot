import { useState } from 'react';

export function BuildRobot() {
  const [headQuantity, setHeadQuantity] = useState('');
  const [error, setError] = useState(null as any);
  const [status, setStatus] = useState('typing');

  if (status === 'success') {
    return <h1>É isso mesmo!</h1>;
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    setStatus('submitting');
    try {
      await submitForm(headQuantity);
      setStatus('success');
    } catch (err) {
      setStatus('typing');
      setError(err);
    }
  }

  function handleHeadQuantity(e: any) {
    setHeadQuantity(e.target.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="head-quantity">Head Quantity</label>
        <input
          id="head-quantity"
          type="number"
          onChange={handleHeadQuantity}
        ></input>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

function submitForm(headQuantity: any) {
  return fetch('http://localhost:3000/api/robot/build', {
    method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
    body: JSON.stringify({
      constraints: {
        head: Number(headQuantity),
        arm: 0,
        leg: 0,
        body: 0,
      },
    }),
  });
}
