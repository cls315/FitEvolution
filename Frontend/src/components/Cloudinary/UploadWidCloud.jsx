import {useEffect,useRef,useState} from 'react'
import style from './UploadWidCloud.module.css'

const UploadWidCloud = ({uploadImage}) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef()
  const [imageUploaded, setImageUploaded] = useState(false);

  useEffect(()=>{
    cloudinaryRef.current=window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget({

      cloudName:'fitevolution',
      uploadPreset:'k0upcy9d'
    },function(error,result){
      if (!error && result && result.event === 'success') {
        console.log('La imagen se subió correctamente:', result.info);
        uploadImage(result.info.secure_url);
        setImageUploaded(true);

        
      }
    })  
  
  },[])
  const handleClick = (e)=>{
    e.preventDefault()
    widgetRef.current.open()
  } 
  return (
    <button disabled={imageUploaded} className={style.buttonWid}onClick={handleClick}> {imageUploaded ? "Imagen cargada" : "Cargar"}</button>
  )
}

export default UploadWidCloud