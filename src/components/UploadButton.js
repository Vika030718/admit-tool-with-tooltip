import React from 'react'

const UploadButton = ({onUpload = f=>f}) =>
	<label className="btn btn-outline-primary mr-2 mb-1">
    	<input 
    		className="d-none"
    		type="file"
    		onChange={(e) => onUpload(e.target.files)}
    		/>
    		Upload Image
    </label>
export default UploadButton