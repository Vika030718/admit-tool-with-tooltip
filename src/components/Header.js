import UploadButton from './UploadButton'
import ClearButton from './ClearButton'
import React from 'react'

const Header =({onUpload = f=>f, onClear})=>
	<header>
		<h1 className="title pt-5 text-center">Admin tool for managing images with tooltip</h1>
		<section className="text-center pb-4">
			<UploadButton onUpload={onUpload}/>
			<ClearButton onClear={onClear}/>
		</section>	
		<hr/>
    </header>

export default Header