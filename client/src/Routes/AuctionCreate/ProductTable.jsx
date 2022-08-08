import styled from 'styled-components';

function ProductTable({ products, mng, deleteProducts }) {
  return (
    <TableBox>
      <Table>
        <colgroup>
          <col width="0%" />
          <col width="70%" />
          <col width="30%" />
        </colgroup>
        <thead>
          <tr>
            <th></th>
            <th>이름</th>
            <th>시작가</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((item, i) => (
              <tr key={i}>
                <td>{mng ? <Minus onClick={() => deleteProducts(i)}>-</Minus> : null}</td>
                <td>{item.productName}</td>
                <td>{item.startPrice}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ padding: '30px' }}>
                상품을 추가해주세요.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </TableBox>
  );
}
const TableBox = styled.div`
  max-height: 200px;
  overflow: overlay;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar,
  &::-webkit-scrollbar-thumb {
    overflow: visible;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(13, 12, 15, 0.4);
  }
`;

const Table = styled.table`
  width: 100%;
  background-color: ${(props) => props.theme.colors.pointBlack};
  border-radius: 5px;

  & tr td,
  tr th {
    padding: 10px;
    text-align: center;
  }
  tr th {
    box-sizing: border-box;
    font-weight: 700;
    background-color: ${(props) => props.theme.colors.pointBlack};
    border-bottom: 1px solid ${(props) => props.theme.colors.mainBlack};
  }
  tr th:nth-child(2),
  tr td:nth-child(2) {
    border-right: 1px dashed ${(props) => props.theme.colors.mainBlack};
  }
`;

const Minus = styled.button`
  background-color: ${(props) => props.theme.colors.pointRed};
  border: none;
  border-radius: 3px;
  font-weight: 700;

  color: ${(props) => props.theme.colors.white};
`;

export default ProductTable;
