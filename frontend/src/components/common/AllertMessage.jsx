import React from 'react'

const AllertMessage = ({type, message}) => {
    if (!message) return null; 
  return (
    <>
        <div
            className={`alert alert-${type} text-center`}
            role="alert">
            {message}
        </div>
    </>
  )
}

export default AllertMessage