import React from 'react'
import { Component } from 'react'
import GalleryItem from './GalleryItem'
import EditImage from './EditImage'


class Gallery extends Component {
    constructor(props) {
        super(props)

        this.state = {
            popupOpenedId: false
        }

        this.openPopup =  this.openPopup.bind(this);
    }

    openPopup(image, i){
        this.setState({
            popupOpenedId: i
        })
    }

    render() { 

        const { images, deleteFile, setPointer, addTooltip } = this.props
        const {popupOpenedId} = this.state
        const {openPopup} = this

        return (
            <section>
                <div className="gallery" >
                    {   
                        images.map((image, i)=>
                            <GalleryItem 
                                    i={i}
                                    key={i}
                                    image={image}
                                    deleteFile={deleteFile}
                                    openPopup={(i)=>openPopup(image, i)}
                                    />
                        )
                    }
                    
                </div>
                {
                    <EditImage 
                        setPointer={setPointer}
                        addTooltip={addTooltip}
                        image={images[popupOpenedId]}
                        i={popupOpenedId}/>
                }
            </section>
        );

    }
}

export default Gallery