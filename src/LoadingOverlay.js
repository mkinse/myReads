import React from 'react'

class LoadingOverlay extends React.Component {
   
  render() {
    return <div className='loaderOverlay'>
        <img src='loader.svg' className='loaderImage' alt='loadingicon' />
        </div>;
  }
}

export default LoadingOverlay
