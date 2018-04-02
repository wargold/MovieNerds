import styled from 'styled-components'

export const StyledImg = styled.div`
            height: 250px;
            width: 250px;
    &:hover .image{
       opacity:1;
        transform: scale(1.3);
    }
    &:hover .title{
       opacity: 0.9;
    }
  `;
export const Info = styled.div`
      position: absolute;
      top: 0;
      margin:10px;
      color:white;
      font-weight:bold;
      opacity:0;
  `;