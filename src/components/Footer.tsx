import styled from 'styled-components';

type FooterProps = {
    selectedRestaurant: string;
    // onSelectedRestaurantChange: (restaurant: string) => void;
};
  
const Footer: React.FC<FooterProps> = ({selectedRestaurant }) => { 

    const title = (selectedRestaurant) ? "Restaurant séléctionné" : "Aucun restaurant séléctionné";

    return (
        <FooterBox>
            <StyledLabelTitle htmlFor="title">{title}</StyledLabelTitle><br/>
            <StyledLabelSelectedRestaurant htmlFor="selectedRestaurant">{selectedRestaurant}</StyledLabelSelectedRestaurant>
            <br/>
             <StyledButton type="button">Continue</StyledButton>
        </FooterBox>
    )
};

export default Footer; 

const FooterBox = styled.div`
    position: absolute;
    width: 100%;
    bottom: 0;
    background: rgb(255 255 255);   
    /* filter: drop-shadow(0 4px 4px #000000);*/
    border-radius: 8px;
    border: 1px solid #ccc;
    z-index: 1000; /* Ensure the form appears above the map */
  `;

  const StyledLabelTitle = styled.label`
  font-size: 14px;
  font-weight: bold;
  font: Inter;
  line-height: 16.94px;
  letf: 13px;
  top: 9px;
  color: #333;
`;

const StyledLabelSelectedRestaurant = styled.label`
  font-size: 14px;
  line-height: 16.94px;
  letf: 13px;
  top: 9px;
  color: #333;

`;

const StyledButton = styled.button`
    position: relative;
    background: #F0C900;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    width: 70px;
    hight: 25px;
    top: 10px;
    margin-bottom: 10px;
    &:hover {
      background-color:rgb(179, 107, 0);
    }
  `;