import React from 'react';
import ElectionMap from './ElectionMap';

export default function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.mapWrapper}>
        <ElectionMap />
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0', // Light grey background
  },
  mapWrapper: {
    width: '80%', // Adjust this to control the zoom-out level
    maxWidth: '600px', // Limit the width for a boxed effect
    overflow: 'hidden', // Hide any overflow
    padding: '20px', // Padding around the map
    backgroundColor: '#ffffff', // White background for the map box
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Shadow for a raised effect
    borderRadius: '8px', // Rounded corners
    transform: 'scale(0.8)', // Scale down to zoom out
    transformOrigin: 'center', // Center the zoom effect
  },
};
