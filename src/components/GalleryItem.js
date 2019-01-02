import React from 'react'


const GalleryItem = ({ image, i, deleteFile=f=>f, openPopup=g=>g}) =>
        <figure className='gallery__figure'>  
                                
            <img src={image.src}	
				 className='img-fluid image'/>
          	<figcaption className="gallery__figcaption">
                <a href='#' 
                   className="btn btn-primary mr-2"
                   onClick={(e) => deleteFile(e)}
                   id={i}>Remove</a>
                <a href='#'
                   className="btn btn-primary"
                   onClick={()=>openPopup(i)}
                   data-toggle="modal"
                   data-target="#edit-image"
                   >Edit</a>

            </figcaption>
			
        </figure>  


export default GalleryItem