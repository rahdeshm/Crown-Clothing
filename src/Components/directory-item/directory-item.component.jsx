import {BackgroundImage,Body,DirectoryITemContainer,} from'./directory-item.styles';
import { useNavigate } from 'react-router-dom';

const DirectoryItem=({category})=>{
    const {title,id,imageUrl,route} =category;
    const navigate=useNavigate();
    const onChangeHandler=()=>navigate(route)
    return (
        <DirectoryITemContainer key={id} onClick={onChangeHandler}>           
          <BackgroundImage imageUrl={imageUrl}  />
          <Body>
              <h2>{title}</h2>
            <p>Shop Now</p>
          </Body>
      </DirectoryITemContainer> 
    )
}

export default DirectoryItem