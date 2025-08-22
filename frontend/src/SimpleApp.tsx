function App() {
  return (
    <div style={{ 
      padding: '50px', 
      backgroundColor: 'blue', 
      color: 'white',
      minHeight: '100vh' 
    }}>
      <h1>SIMPLE TEST APP</h1>
      <p>Kui näed seda, siis frontend töötab!</p>
      <button onClick={() => alert('Click töötab!')}>Test Button</button>
    </div>
  );
}

export default App;
