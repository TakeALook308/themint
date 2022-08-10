import React, { useState } from 'react';
import styled from 'styled-components';
import { Container, Title } from '../../style/style';
import { categories } from '../../utils/constants/constant';
import ActiveInputBox from '../../components/common/ActiveInputBox';
import ProductTable from './ProductTable';
import Modal from '../../components/common/Modal';
import { useDropzone } from 'react-dropzone';
import { auctionApis } from '../../utils/apis/auctionApi';
import { postData } from '../../utils/apis/api';
import { useNavigate } from 'react-router-dom';

function AuctionCreatePage(props) {
  const navigate = useNavigate();
  const onDrop = (acceptedFiles) => {
    let temp = [...productList];
    acceptedFiles.map((item) => temp.push(item));
    onChange({
      target: { name: 'auctionImageList', value: temp },
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const [inputAuction, setInputAuction] = useState({
    categorySeq: 1,
    auctionImageList: [],
    title: '',
    content: '',
    startTime: '',
    productList: [],
  });

  const { categorySeq, auctionImageList, title, content, productList } = inputAuction;
  const startTime =
    inputAuction.startTime.substring(0, 10) + 'T' + inputAuction.startTime.substring(11, 16);
  const [reservation, setReservation] = useState(false);
  const [productName, setProductName] = useState('');
  const [startPrice, setStartPrice] = useState('');

  const onChange = ({ target: { name, value } }) => {
    if (name === 'startTime') {
      const time = value.substring(0, 10) + ' ' + value.substring(11) + ':00';
      setInputAuction({
        ...inputAuction,
        [name]: time,
      });
    } else {
      setInputAuction({
        ...inputAuction,
        [name]: value,
      });
    }
  };

  const isChecked = (checked) => {
    if (checked) {
      setReservation(true);
    } else {
      setReservation(false);
    }
  };

  const createProducts = (e) => {
    if (productName && startPrice) {
      onChange({
        target: { name: 'productList', value: [...productList, { productName, startPrice }] },
      });
      setProductName('');
      setStartPrice('');
    }
  };

  const deleteProducts = (index) => {
    onChange({
      target: { name: 'productList', value: productList.filter((product, i) => index !== i) },
    });
  };

  const [isModal, setIsModal] = useState(false);
  const ModalHandler = () => {
    setIsModal((prev) => !prev);
  };
  return (
    <Container>
      <Title>경매 생성</Title>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          postData(auctionApis.AUCTION_CREATE_API, inputAuction)
            .then(() => {
              console.log(inputAuction);
              alert('성공');
              // navigate(`/main`);
            })
            .catch(() => {
              console.log(inputAuction);
              alert('실패');
              // navigate(`/main`);
            });
        }}>
        <Div>
          <Label>카테고리</Label>
          <Select name="categorySeq" value={categorySeq} onChange={onChange}>
            {categories.map((item, i) => (
              <option key={i} value={item.seq}>
                {item.name}
              </option>
            ))}
          </Select>
        </Div>

        <Div>
          <Label>사진 업로드</Label>
          <FileUpload>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : auctionImageList.length === 0 ? (
                <div>파일을 추가해주세요</div>
              ) : (
                <div>
                  {/* {auctionImageList.map((item, i) => (
                    <p key={i}>{item.path}</p>
                  ))} */}
                </div>
              )}
            </div>
          </FileUpload>
        </Div>

        <Div>
          <Label>제목</Label>
          <ActiveInputBox
            placeholder="제목 입력..."
            name="title"
            value={title}
            onChange={onChange}
          />
        </Div>

        <Div>
          <Label>내용</Label>
          <Textarea
            name="content"
            id="content"
            cols="30"
            rows="10"
            placeholder="내용을 입력하세요.."
            onChange={onChange}
            value={content}></Textarea>
        </Div>

        <Div>
          <Label style={{ display: 'inline-block', lineHeight: '24px', verticalAlign: 'middle' }}>
            예약
          </Label>
          <CheckBox
            type="checkbox"
            id="reservation"
            key="yes"
            onChange={(e) => isChecked(e.target.checked)}></CheckBox>
          <label htmlFor="reservation"></label>
          <ActiveInputBox
            name="startTime"
            type="datetime-local"
            onChange={onChange}
            disabled={!reservation}
            value={startTime}
          />
        </Div>

        <Div>
          <Label>
            상품 ({productList.length})
            <Plus type="button" onClick={ModalHandler}>
              +
            </Plus>
          </Label>

          <ProductTable productList={productList} />
        </Div>
        <SubmitBox>
          <button type="submit">생성</button>
        </SubmitBox>
      </form>

      <Modal open={isModal} close={ModalHandler} title="상품 관리">
        <Label>상품 ({productList.length})</Label>
        <ProductTable
          productList={productList}
          mng={true}
          deleteProducts={deleteProducts}></ProductTable>
        <Label>이름</Label>
        <ActiveInputBox
          placeholder="이름 입력"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <Label>시작가</Label>
        <ActiveInputBox
          type="number"
          placeholder="시작가 입력"
          value={startPrice}
          onChange={(e) => setStartPrice(e.target.value)}
        />
        <Button onClick={createProducts}>추가</Button>
      </Modal>
    </Container>
  );
}
const Button = styled.button`
  display: block;
  margin: 40px auto 20px;
`;
const Plus = styled.button`
  position: absolute;
  right: 0;
  width: 24px;
  height: 24px;
`;

const CheckBox = styled.input`
  display: none;
  & + label {
    line-height: 64px;
    vertical-align: middle;
    margin-left: 15px;
    border-radius: 3px;
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: #fff;
  }
  &:checked + label {
    background-color: ${(props) => props.theme.colors.subMint};
    background: url(https://w7.pngwing.com/pngs/516/365/png-transparent-computer-icons-check-mark-desktop-ppt-icon-miscellaneous-angle-hand-thumbnail.png);
    background-size: 20px 20px;
  }
  &:checked ~ input[type='datetime-local'] {
  }
`;

const Select = styled.select`
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 40px;
  color: ${(props) => props.theme.colors.white};
  padding: 10px;
  margin: 0;
  border: none;
  border-radius: 5px;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
  background: url('https://user-images.githubusercontent.com/57048162/183007422-e8474fa0-acc1-441e-b7e1-c0701b82b766.png')
    no-repeat;
  background-position: 99%;
  background-size: 15px 12px;
  background-color: ${(props) => props.theme.colors.pointBlack};

  & option {
    display: block;
    padding: 10px;
  }
`;

const SubmitBox = styled.div`
  width: 100%;
  padding: 15px 0;
  display: flex;
  justify-content: center;

  button {
    display: inline-block;
  }
`;

const Div = styled.div`
  padding: 15px 80px;
  position: relative;
`;

const FileUpload = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.pointBlack};
`;
const Textarea = styled.textarea`
  width: 100%;
  background-color: ${(props) => props.theme.colors.pointBlack};
  border: none;
  border-radius: 5px;
  color: ${(props) => props.theme.colors.white};
  padding: 10px;
  resize: none;
  font-family: Pretendard;
  font-size: 14px;
`;
const Label = styled.p`
  font-size: 20px;
  font-weight: 600;
  padding: 20px 0;
  position: relative;
`;

export default AuctionCreatePage;
