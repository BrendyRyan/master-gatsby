import styled from 'styled-components';

const OrderStyles = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  fieldset {
    grid-column: span 2;
    max-height: 600px;
    overflow: auto;
    align-content: start;
    legend {
      display: block;
    }
    input {
      width: 100%;
    }
    &.order,
    &.menu {
      display: grid;
      gap: 1rem;
      grid-column: span 1;
      /* Chrome is weird about Grid and fieldsets, so we add a fixed height to fix it :)  */
      height: 600px;
    }
  }
  .mapleSyrup {
    display: none;
  }
  @media (max-width: 900px) {
    fieldset.menu,
    fieldset.order {
      grid-column: span2;
    }
  }
`;

export default OrderStyles;
