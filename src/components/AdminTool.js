import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom';
import { v4 } from 'uuid'
import validator from 'validator';

import Gallery from './Gallery'
import Header from './Header'

class AdminTool extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gallery: []
        };

        this.localStorageKey = 'gallery';

        this.uploadFile =  this.uploadFile.bind(this);
        this.deleteFile =  this.deleteFile.bind(this);
        this.setPointer =  this.setPointer.bind(this);
        this.addTooltip =  this.addTooltip.bind(this);
        
        this.localStorageClear =  this.localStorageClear.bind(this);
        this.getBase64Image =  this.getBase64Image.bind(this);
    }

    componentWillMount(){
        var gallery = JSON.parse(localStorage.getItem(this.localStorageKey))

        this.setState({
            gallery: gallery
        })
    }

    deleteFile(e){
        e.preventDefault();
        const imageId = e.target.id
        let updatedImages = Object.assign([], this.state.gallery)
        updatedImages.splice(imageId, 1)

        this.setState({
            gallery: updatedImages
        })

        localStorage.removeItem(this.localStorageKey);
        localStorage.setItem(this.localStorageKey, JSON.stringify(updatedImages));
    }

    setPointer(e, id){
        var pointerRect = e.target.getBoundingClientRect();
        var pointerX = e.clientX - pointerRect.left + 8 + 'px'; 
        var pointerY = e.clientY - pointerRect.top + 8 + 'px';

        let ball = document.getElementById('my-pointer');


        let updatedImages = Object.assign([], this.state.gallery)
        updatedImages[id].pointer.pointerX = pointerX;
        updatedImages[id].pointer.pointerY = pointerY;

        this.setState({
            gallery: updatedImages
        })  

        localStorage.setItem(this.localStorageKey, JSON.stringify(updatedImages));
    }

    addTooltip(e, id){
        let tooltip = e.target.previousElementSibling.value;
        e.target.previousElementSibling.value="";
        let updatedImages = Object.assign([], this.state.gallery)
        updatedImages[id].tooltip = tooltip;
        this.setState({
            gallery: updatedImages
        }) 
        localStorage.setItem(this.localStorageKey, JSON.stringify(updatedImages));
    }

    getBase64Image(img) {
        return new Promise((resolve,reject) => {
             const reader = new FileReader();
             reader.onload = () => resolve(reader.result);
             reader.onerror = error => reject(error);
             reader.readAsDataURL(img);
          });
    }

    uploadFile(files) {
        const file = files[0];
        const fileId = v4();
        let updatedImages = [];

        this.getBase64Image(file).then(base64 => {

            const newImage = {
                id: fileId,
                src: base64,
                title: "Title",
                pointer: {
                    nterRect: null,
                    pointerX: -1,
                    pointerY: -1
                },
                tooltip: ""
            }

            if(this.state.gallery){
                updatedImages = [
                    ...this.state.gallery,
                    newImage
                ]
            } else {
                updatedImages = [
                    newImage
                ]
            }

            this.setState({
                gallery: updatedImages
            })

            localStorage.setItem(this.localStorageKey, JSON.stringify(updatedImages));
          });
    }

    localStorageClear(){
        localStorage.clear();
        this.setState({
            gallery: []
        })
    }

    render() {

        const { gallery} = this.state
        const { uploadFile, deleteFile, setPointer, addTooltip, localStorageClear, openPopup } = this

        return (
            <div className="main">
                <Header onUpload={uploadFile} onClear={localStorageClear}/>
                {
                    (gallery)?
                        <section>
                            <Gallery 
                                images={gallery}
                                deleteFile={deleteFile}
                                setPointer={setPointer}
                                addTooltip={addTooltip}/>
                                
                        </section>:
                        <div className="col-md-12 text-center pt-4">Please, add some images</div>
                }
            </div>

        );
    }
}

export default AdminTool