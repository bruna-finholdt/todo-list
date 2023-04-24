import styled from "styled-components";

const HeaderComponent = () => {
  const Header = styled.header`
    font-size: 80px;
    flex: 1;
    margin-bottom: 20px;
    margin-right: 30px;
    text-shadow: 10px 2px 4px rgba(0, 0, 0, 0.2);
  `;
  return (
    <>
      <Header>TODO List</Header>
    </>
  );
};

export default HeaderComponent;
