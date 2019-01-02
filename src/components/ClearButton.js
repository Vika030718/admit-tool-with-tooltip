import React from 'react'

const ClearButton = ({onClear = f=>f}) =>
    <button 
    	type="button"
    	className="btn btn-outline-primary mb-1"
    	onClick={() => onClear()}>
    	Clear LocalStorage
    </button>

export default ClearButton